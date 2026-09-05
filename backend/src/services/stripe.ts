/**
 * Stripe as a churn data source.
 *
 * Billing data is the richest churn signal most companies already have: who
 * pays, how much, since when, and whether invoices are starting to fail. This
 * pulls customers + subscriptions and maps them onto our schema.
 *
 * Uses Stripe's REST API over fetch rather than the SDK to keep the dependency
 * surface small; all calls are read-only apart from webhook registration.
 */

import { createHmac, timingSafeEqual } from "crypto";

const STRIPE_API = "https://api.stripe.com/v1";

interface StripeListResponse<T> {
  object: "list";
  data: T[];
  has_more: boolean;
}

interface StripeCustomer {
  id: string;
  email: string | null;
  name: string | null;
  description: string | null;
  created: number;
  delinquent: boolean | null;
  currency: string | null;
  metadata: Record<string, string>;
}

interface StripeSubscription {
  id: string;
  customer: string;
  status: string;
  created: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  items: {
    data: {
      quantity: number | null;
      price: {
        unit_amount: number | null;
        currency: string;
        recurring: { interval: string; interval_count: number } | null;
        nickname: string | null;
        product: string | { id: string; name?: string };
      };
    }[];
  };
}

export class StripeError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "StripeError";
  }
}

async function stripeGet<T>(
  apiKey: string,
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${STRIPE_API}${path}${query ? `?${query}` : ""}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Stripe-Version": "2024-06-20",
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    throw new StripeError(
      body.error?.message ?? `Stripe request failed (${response.status})`,
      response.status
    );
  }

  return (await response.json()) as T;
}

/** Verifies a key and returns the account it belongs to. */
export async function verifyKey(apiKey: string): Promise<{ id: string; name: string }> {
  const account = await stripeGet<{
    id: string;
    business_profile?: { name?: string | null };
    settings?: { dashboard?: { display_name?: string | null } };
    email?: string | null;
  }>(apiKey, "/account");

  return {
    id: account.id,
    name:
      account.settings?.dashboard?.display_name ||
      account.business_profile?.name ||
      account.email ||
      account.id,
  };
}

async function listAll<T>(
  apiKey: string,
  path: string,
  params: Record<string, string>,
  max = 5000
): Promise<T[]> {
  const out: T[] = [];
  let startingAfter: string | undefined;

  while (out.length < max) {
    const page = await stripeGet<StripeListResponse<T & { id: string }>>(apiKey, path, {
      ...params,
      limit: "100",
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    out.push(...(page.data as T[]));
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1].id;
  }

  return out;
}

/** Normalises any Stripe billing interval to a monthly figure. */
function monthlyAmount(subscription: StripeSubscription): number {
  return subscription.items.data.reduce((sum, item) => {
    const unit = (item.price.unit_amount ?? 0) / 100;
    const quantity = item.quantity ?? 1;
    const recurring = item.price.recurring;
    if (!recurring) return sum + unit * quantity;

    const count = recurring.interval_count || 1;
    const perMonth =
      recurring.interval === "year"
        ? unit / (12 * count)
        : recurring.interval === "week"
          ? (unit * 52) / (12 * count)
          : recurring.interval === "day"
            ? (unit * 365) / (12 * count)
            : unit / count;

    return sum + perMonth * quantity;
  }, 0);
}

function planFromSubscription(subscription: StripeSubscription, mrr: number): string {
  const nickname = subscription.items.data[0]?.price.nickname?.toLowerCase() ?? "";
  if (nickname.includes("enterprise")) return "enterprise";
  if (nickname.includes("pro") || nickname.includes("business")) return "pro";
  if (nickname.includes("starter") || nickname.includes("basic")) return "starter";

  if (mrr >= 500) return "enterprise";
  if (mrr >= 100) return "pro";
  if (mrr > 0) return "starter";
  return "free";
}

export interface StripeCustomerRecord {
  email: string;
  name: string;
  company: string | null;
  plan: string;
  mrr: number;
  signupDate: Date;
  lastActiveAt: Date;
  sourceId: string;
  /** Set when the subscription is cancelled or cancelling. */
  churned: boolean;
  attributes: Record<string, unknown>;
  /** Billing-derived risk signals, folded into the model's inputs. */
  supportTickets: number | null;
  healthScore: number | null;
}

/**
 * Pulls the Stripe account into our customer shape.
 *
 * Billing state maps onto churn signals: a delinquent account or one set to
 * cancel at period end is a customer actively leaving, which we reflect in the
 * health score rather than inventing engagement numbers we do not have.
 */
export async function fetchCustomers(apiKey: string): Promise<StripeCustomerRecord[]> {
  const [customers, subscriptions] = await Promise.all([
    listAll<StripeCustomer>(apiKey, "/customers", {}),
    listAll<StripeSubscription>(apiKey, "/subscriptions", { status: "all" }),
  ]);

  const byCustomer = new Map<string, StripeSubscription[]>();
  for (const subscription of subscriptions) {
    const list = byCustomer.get(subscription.customer) ?? [];
    list.push(subscription);
    byCustomer.set(subscription.customer, list);
  }

  const records: StripeCustomerRecord[] = [];

  for (const customer of customers) {
    if (!customer.email) continue; // Email is our identity key.

    const subs = byCustomer.get(customer.id) ?? [];
    const active = subs.filter((s) => s.status === "active" || s.status === "trialing");
    const relevant = active.length > 0 ? active : subs;
    const mrr = active.reduce((sum, s) => sum + monthlyAmount(s), 0);

    const latest = relevant.sort((a, b) => b.created - a.created)[0];
    const cancelling = latest?.cancel_at_period_end === true;
    const cancelled = latest ? ["canceled", "unpaid", "incomplete_expired"].includes(latest.status) : false;
    const pastDue = latest?.status === "past_due" || customer.delinquent === true;

    // The last billing event we can see is the best "still here" proxy Stripe gives us.
    const lastActive = latest
      ? new Date(Math.min(latest.current_period_end * 1000, Date.now()))
      : new Date(customer.created * 1000);

    let healthScore: number | null = null;
    if (cancelled) healthScore = 5;
    else if (cancelling) healthScore = 20;
    else if (pastDue) healthScore = 30;
    else if (active.length > 0) healthScore = 75;

    records.push({
      email: customer.email.toLowerCase(),
      name: customer.name || customer.email.split("@")[0],
      company: customer.name || customer.description || null,
      plan: latest ? planFromSubscription(latest, mrr) : "free",
      mrr: Math.round(mrr * 100) / 100,
      signupDate: new Date(customer.created * 1000),
      lastActiveAt: lastActive,
      sourceId: customer.id,
      churned: cancelled,
      // Failed payments are the billing equivalent of a support escalation.
      supportTickets: pastDue ? 3 : null,
      healthScore,
      attributes: {
        stripeCustomerId: customer.id,
        subscriptionStatus: latest?.status ?? "none",
        cancelAtPeriodEnd: cancelling,
        delinquent: customer.delinquent ?? false,
        currency: customer.currency ?? null,
        ...customer.metadata,
      },
    });
  }

  return records;
}

/** Stripe signs webhooks with a scheme we verify without the SDK. */
export function verifyWebhookSignature(
  payload: string,
  signatureHeader: string,
  secret: string,
  toleranceSeconds = 300
): boolean {
  const parts = signatureHeader.split(",").reduce<Record<string, string[]>>((acc, part) => {
    const [key, value] = part.split("=");
    if (!key || !value) return acc;
    (acc[key.trim()] ??= []).push(value.trim());
    return acc;
  }, {});

  const timestamp = parts.t?.[0];
  const signatures = parts.v1 ?? [];
  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > toleranceSeconds) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`, "utf8")
    .digest("hex");

  return signatures.some((signature) => {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    return a.length === b.length && timingSafeEqual(a, b);
  });
}
