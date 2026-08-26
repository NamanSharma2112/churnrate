/**
 * Maps an arbitrary customer export onto the churn schema.
 *
 * Companies name their columns however they like ("Account Name", "monthly_revenue",
 * "Last Seen"), so instead of demanding a fixed header we score every incoming column
 * against a synonym list plus a value-shape check, and keep whatever we cannot place
 * in `attributes` so nothing is silently dropped.
 */

export type CanonicalField =
  | "name"
  | "email"
  | "company"
  | "plan"
  | "mrr"
  | "signupDate"
  | "lastActiveAt"
  | "healthScore"
  | "supportTickets"
  | "featureUsagePct"
  | "loginFrequency"
  | "npsScore"
  | "contractValue"
  | "externalId";

type FieldType = "string" | "number" | "date" | "percent" | "currency";

interface FieldSpec {
  type: FieldType;
  /** Lower-cased, punctuation-stripped aliases. Ordered best-first. */
  aliases: string[];
  /** Substrings that make a header a likely match even without an exact alias. */
  hints?: string[];
  label: string;
  description: string;
}

export const FIELD_SPECS: Record<CanonicalField, FieldSpec> = {
  email: {
    type: "string",
    label: "Email",
    description: "Unique identifier for the account holder",
    aliases: [
      "email",
      "emailaddress",
      "email_address",
      "useremail",
      "contactemail",
      "primaryemail",
      "workemail",
      "billingemail",
      "mail",
    ],
    hints: ["email", "mail"],
  },
  name: {
    type: "string",
    label: "Contact name",
    description: "Person who owns the account",
    aliases: [
      "name",
      "fullname",
      "customername",
      "contactname",
      "contact",
      "username",
      "displayname",
      "primarycontact",
      "owner",
    ],
    hints: ["name", "contact"],
  },
  company: {
    type: "string",
    label: "Company",
    description: "Organisation or account name",
    aliases: [
      "company",
      "companyname",
      "account",
      "accountname",
      "organisation",
      "organization",
      "org",
      "business",
      "customer",
      "client",
      "workspace",
      "team",
      "tenant",
    ],
    hints: ["company", "account", "organ", "client", "business"],
  },
  plan: {
    type: "string",
    label: "Plan",
    description: "Subscription tier",
    aliases: [
      "plan",
      "planname",
      "tier",
      "subscription",
      "subscriptionplan",
      "subscriptiontier",
      "package",
      "productname",
      "product",
      "pricingplan",
      "licensetype",
    ],
    hints: ["plan", "tier", "subscription", "package"],
  },
  mrr: {
    type: "currency",
    label: "MRR",
    description: "Monthly recurring revenue",
    aliases: [
      "mrr",
      "monthlyrecurringrevenue",
      "monthlyrevenue",
      "revenue",
      "monthlyspend",
      "monthlyvalue",
      "amount",
      "subscriptionamount",
      "price",
      "monthlyprice",
      "arr",
      "annualrecurringrevenue",
      "spend",
    ],
    hints: ["mrr", "revenue", "spend", "amount", "price", "arr"],
  },
  contractValue: {
    type: "currency",
    label: "Contract value",
    description: "Total contract or lifetime value",
    aliases: [
      "contractvalue",
      "totalcontractvalue",
      "tcv",
      "acv",
      "ltv",
      "lifetimevalue",
      "totalspend",
      "totalrevenue",
      "totalpaid",
    ],
    hints: ["contract", "lifetime", "ltv", "tcv", "acv"],
  },
  signupDate: {
    type: "date",
    label: "Signup date",
    description: "When the account started",
    aliases: [
      "signupdate",
      "signedup",
      "signup",
      "createdat",
      "created",
      "createddate",
      "startdate",
      "subscriptionstart",
      "joindate",
      "joined",
      "customersince",
      "firstseen",
      "registrationdate",
      "onboardingdate",
    ],
    hints: ["signup", "created", "start", "join", "since", "registration"],
  },
  lastActiveAt: {
    type: "date",
    label: "Last active",
    description: "Most recent activity — the strongest churn signal",
    aliases: [
      "lastactive",
      "lastactiveat",
      "lastseen",
      "lastseenat",
      "lastlogin",
      "lastloginat",
      "lastactivity",
      "lastactivitydate",
      "lastusage",
      "lastsession",
      "recentactivity",
      "lastevent",
    ],
    hints: ["lastactive", "lastseen", "lastlogin", "lastactivity", "lastsession"],
  },
  healthScore: {
    type: "number",
    label: "Health score",
    description: "Account health, 0-100",
    aliases: [
      "healthscore",
      "health",
      "accounthealth",
      "customerhealth",
      "healthindex",
      "score",
      "satisfaction",
      "csat",
    ],
    hints: ["health", "csat", "satisfaction"],
  },
  supportTickets: {
    type: "number",
    label: "Support tickets",
    description: "Open or recent support contacts",
    aliases: [
      "supporttickets",
      "tickets",
      "ticketcount",
      "supportcases",
      "cases",
      "complaints",
      "issues",
      "escalations",
      "supportrequests",
    ],
    hints: ["ticket", "case", "complaint", "escalation", "support"],
  },
  featureUsagePct: {
    type: "percent",
    label: "Feature usage %",
    description: "Share of the product actually used",
    aliases: [
      "featureusage",
      "featureusagepct",
      "usage",
      "usagepct",
      "usagepercent",
      "adoption",
      "adoptionrate",
      "featureadoption",
      "utilisation",
      "utilization",
      "seatsused",
      "activeusers",
    ],
    hints: ["usage", "adoption", "utilis", "utiliz"],
  },
  loginFrequency: {
    type: "number",
    label: "Login frequency",
    description: "Logins or sessions per month",
    aliases: [
      "loginfrequency",
      "logins",
      "logincount",
      "sessions",
      "sessioncount",
      "monthlylogins",
      "visits",
      "activedays",
      "loginspermonth",
    ],
    hints: ["login", "session", "visit", "activedays"],
  },
  npsScore: {
    type: "number",
    label: "NPS",
    description: "Net promoter score, 0-10",
    aliases: ["nps", "npsscore", "netpromoterscore", "promoterscore", "rating"],
    hints: ["nps", "promoter"],
  },
  externalId: {
    type: "string",
    label: "External ID",
    description: "Your own identifier for this account",
    aliases: [
      "id",
      "externalid",
      "customerid",
      "accountid",
      "userid",
      "clientid",
      "recordid",
      "uuid",
      "reference",
    ],
    hints: ["id", "reference", "uuid"],
  },
};

export const CANONICAL_FIELDS = Object.keys(FIELD_SPECS) as CanonicalField[];

/** "Monthly Recurring Revenue ($)" -> "monthlyrecurringrevenue" */
function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]/g, "");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CURRENCY_RE = /^[\s$€£₹¥]*-?[\d,]+(\.\d+)?\s*(usd|eur|gbp|inr)?$/i;

function looksLikeEmail(values: string[]): boolean {
  return values.length > 0 && values.filter((v) => EMAIL_RE.test(v)).length / values.length > 0.7;
}

function looksLikeDate(values: string[]): boolean {
  if (values.length === 0) return false;
  const parsed = values.filter((v) => {
    // Reject bare integers: "42" parses as a year in some runtimes.
    if (/^\d+$/.test(v) && v.length !== 8) return false;
    return !Number.isNaN(new Date(v).getTime());
  });
  return parsed.length / values.length > 0.7;
}

function looksLikeNumber(values: string[]): boolean {
  if (values.length === 0) return false;
  const nums = values.filter((v) => CURRENCY_RE.test(v.trim()) || /^-?\d+(\.\d+)?%?$/.test(v.trim()));
  return nums.length / values.length > 0.7;
}

function typeMatches(type: FieldType, values: string[]): boolean {
  switch (type) {
    case "date":
      return looksLikeDate(values);
    case "number":
    case "percent":
    case "currency":
      return looksLikeNumber(values);
    case "string":
      return true;
  }
}

export interface ColumnMatch {
  column: string;
  field: CanonicalField | null;
  confidence: number;
  reason: string;
}

/**
 * Scores one header against one canonical field. 0 means "no match".
 * Exact alias hits win; hint substrings are a weaker signal; a value-shape
 * mismatch (e.g. a "date" column full of names) caps the score.
 */
function scoreColumn(header: string, samples: string[], field: CanonicalField): number {
  const spec = FIELD_SPECS[field];
  const norm = normalizeHeader(header);
  if (!norm) return 0;

  let score = 0;
  const aliasIndex = spec.aliases.indexOf(norm);
  if (aliasIndex === 0) score = 1;
  else if (aliasIndex > 0) score = 0.95 - Math.min(aliasIndex, 8) * 0.02;
  else if (spec.aliases.some((a) => norm === a.replace(/s$/, "") || norm + "s" === a)) score = 0.9;
  else if (spec.hints?.some((h) => norm.includes(h))) score = 0.6;
  else if (spec.aliases.some((a) => a.length > 4 && norm.includes(a))) score = 0.55;

  if (score === 0) return 0;

  // Email is unambiguous from its values, so let the data override a vague header.
  if (field === "email" && looksLikeEmail(samples)) return Math.max(score, 0.99);

  if (!typeMatches(spec.type, samples)) score *= 0.35;
  return score;
}

export interface DetectedMapping {
  /** canonical field -> source column name */
  mapping: Partial<Record<CanonicalField, string>>;
  matches: ColumnMatch[];
  /** Columns we could not place; preserved on the customer record. */
  unmapped: string[];
  missingRequired: CanonicalField[];
}

const REQUIRED_FIELDS: CanonicalField[] = ["email"];

/**
 * Detects the best column mapping for a set of rows. Greedy on confidence so a
 * single column is never claimed by two fields (e.g. "revenue" -> mrr, not contractValue).
 */
export function detectMapping(rows: Record<string, unknown>[]): DetectedMapping {
  const headers = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row).forEach((k) => set.add(k));
      return set;
    }, new Set())
  );

  const samplesFor = (header: string) =>
    rows
      .slice(0, 50)
      .map((r) => r[header])
      .filter((v) => v !== null && v !== undefined && String(v).trim() !== "")
      .map((v) => String(v).trim());

  const candidates: { header: string; field: CanonicalField; score: number }[] = [];
  for (const header of headers) {
    const samples = samplesFor(header);
    for (const field of CANONICAL_FIELDS) {
      const score = scoreColumn(header, samples, field);
      if (score >= 0.5) candidates.push({ header, field, score });
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  const mapping: Partial<Record<CanonicalField, string>> = {};
  const takenHeaders = new Set<string>();
  const matches: ColumnMatch[] = [];

  for (const candidate of candidates) {
    if (mapping[candidate.field] || takenHeaders.has(candidate.header)) continue;
    mapping[candidate.field] = candidate.header;
    takenHeaders.add(candidate.header);
    matches.push({
      column: candidate.header,
      field: candidate.field,
      confidence: Math.round(candidate.score * 100) / 100,
      reason:
        candidate.score >= 0.9
          ? "Column name matches a known field"
          : candidate.score >= 0.6
            ? "Column name is similar to a known field"
            : "Matched on column values",
    });
  }

  const unmapped = headers.filter((h) => !takenHeaders.has(h));
  unmapped.forEach((column) =>
    matches.push({ column, field: null, confidence: 0, reason: "Kept as a custom attribute" })
  );

  return {
    mapping,
    matches,
    unmapped,
    missingRequired: REQUIRED_FIELDS.filter((f) => !mapping[f]),
  };
}

/* ------------------------------------------------------------------ *
 * Value coercion
 * ------------------------------------------------------------------ */

export function parseNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const cleaned = String(value)
    .trim()
    .replace(/[$€£₹¥,\s]/g, "")
    .replace(/(usd|eur|gbp|inr)$/i, "")
    .replace(/%$/, "");
  if (cleaned === "" || cleaned === "-") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function parseDate(value: unknown): Date | null {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  const raw = String(value).trim();

  // Unix seconds / milliseconds — common in Stripe and warehouse exports.
  if (/^\d{10}$/.test(raw)) return new Date(Number(raw) * 1000);
  if (/^\d{13}$/.test(raw)) return new Date(Number(raw));

  // Prefer DD/MM/YYYY when the first part cannot be a month.
  const slash = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (slash) {
    const [, a, b, y] = slash;
    const first = Number(a);
    const second = Number(b);
    const [month, day] = first > 12 ? [second, first] : [first, second];
    const d = new Date(Number(y), month - 1, day);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

const PLAN_SYNONYMS: { canonical: string; patterns: RegExp[] }[] = [
  { canonical: "enterprise", patterns: [/enterprise/i, /platinum/i, /premium\s*plus/i, /custom/i, /unlimited/i, /scale/i, /tier\s*4/i] },
  { canonical: "pro", patterns: [/^pro/i, /professional/i, /business/i, /premium/i, /gold/i, /growth/i, /advanced/i, /plus/i, /team/i, /tier\s*3/i] },
  { canonical: "starter", patterns: [/starter/i, /basic/i, /standard/i, /silver/i, /essential/i, /lite/i, /individual/i, /personal/i, /tier\s*2/i] },
  { canonical: "free", patterns: [/free/i, /trial/i, /freemium/i, /none/i, /bronze/i, /tier\s*1/i, /^0$/] },
];

/**
 * Normalises whatever a company calls its tiers onto our four buckets. When the
 * name is unrecognisable we fall back to price banding, and keep the original
 * label in `attributes.originalPlan` so the UI can still show it.
 */
export function normalizePlan(value: unknown, mrr?: number | null): string {
  const raw = value === null || value === undefined ? "" : String(value).trim();
  if (raw) {
    for (const { canonical, patterns } of PLAN_SYNONYMS) {
      if (patterns.some((p) => p.test(raw))) return canonical;
    }
  }
  if (mrr !== null && mrr !== undefined) {
    if (mrr >= 500) return "enterprise";
    if (mrr >= 100) return "pro";
    if (mrr > 0) return "starter";
    return "free";
  }
  return "free";
}

/** Percentages arrive as 0-1 ratios or 0-100 values depending on the source. */
export function parsePercent(value: unknown): number | null {
  const n = parseNumber(value);
  if (n === null) return null;
  const scaled = n > 0 && n <= 1 && !String(value).includes("%") ? n * 100 : n;
  return Math.min(Math.max(scaled, 0), 100);
}

export interface NormalizedRow {
  email: string;
  name: string;
  company: string | null;
  plan: string;
  mrr: number;
  signupDate: Date | null;
  lastActiveAt: Date | null;
  healthScore: number | null;
  supportTickets: number | null;
  featureUsagePct: number | null;
  loginFrequency: number | null;
  npsScore: number | null;
  contractValue: number | null;
  externalId: string | null;
  attributes: Record<string, unknown>;
}

export interface RowError {
  row: number;
  email?: string;
  error: string;
}

/**
 * Applies a mapping to raw rows. Rows without a usable email are reported rather
 * than thrown, so one bad line never fails an otherwise good import.
 */
export function normalizeRows(
  rows: Record<string, unknown>[],
  mapping: Partial<Record<CanonicalField, string>>,
  unmapped: string[] = []
): { rows: NormalizedRow[]; errors: RowError[] } {
  const out: NormalizedRow[] = [];
  const errors: RowError[] = [];
  const seen = new Set<string>();

  const get = (row: Record<string, unknown>, field: CanonicalField): unknown => {
    const column = mapping[field];
    return column === undefined ? undefined : row[column];
  };

  rows.forEach((row, index) => {
    const email = String(get(row, "email") ?? "").trim().toLowerCase();

    if (!email) {
      errors.push({ row: index + 1, error: "No email address in this row" });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      errors.push({ row: index + 1, email, error: `"${email}" is not a valid email address` });
      return;
    }
    if (seen.has(email)) {
      errors.push({ row: index + 1, email, error: "Duplicate email in this file" });
      return;
    }
    seen.add(email);

    const mrrRaw = parseNumber(get(row, "mrr"));
    // An ARR-style column divided by 12 is closer to MRR than the raw figure.
    const mrrColumn = mapping.mrr ? normalizeHeader(mapping.mrr) : "";
    const isAnnual = mrrColumn.includes("arr") || mrrColumn.includes("annual") || mrrColumn.includes("yearly");
    const mrr = mrrRaw === null ? 0 : Math.max(isAnnual ? mrrRaw / 12 : mrrRaw, 0);

    const company = get(row, "company");
    const name = get(row, "name");

    const attributes: Record<string, unknown> = {};
    for (const column of unmapped) {
      const value = row[column];
      if (value !== null && value !== undefined && String(value).trim() !== "") {
        attributes[column] = value;
      }
    }
    const originalPlan = get(row, "plan");
    if (originalPlan) attributes.originalPlan = String(originalPlan);

    out.push({
      email,
      // Fall back to the company, then the email local-part, so the UI never
      // renders a blank primary label.
      name: String(name ?? "").trim() || String(company ?? "").trim() || email.split("@")[0],
      company: String(company ?? "").trim() || null,
      plan: normalizePlan(originalPlan, mrr),
      mrr: Math.round(mrr * 100) / 100,
      signupDate: parseDate(get(row, "signupDate")),
      lastActiveAt: parseDate(get(row, "lastActiveAt")),
      healthScore: parsePercent(get(row, "healthScore")),
      supportTickets: parseNumber(get(row, "supportTickets")),
      featureUsagePct: parsePercent(get(row, "featureUsagePct")),
      loginFrequency: parseNumber(get(row, "loginFrequency")),
      npsScore: parseNumber(get(row, "npsScore")),
      contractValue: parseNumber(get(row, "contractValue")),
      externalId: String(get(row, "externalId") ?? "").trim() || null,
      attributes,
    });
  });

  return { rows: out, errors };
}
