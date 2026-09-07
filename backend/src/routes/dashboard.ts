import { Router } from "express";
import { prisma } from "../config/database.js";
import { authenticate } from "../middleware/auth.js";
import { config } from "../config/index.js";

const router = Router();

router.use(authenticate);

const DAY_MS = 1000 * 60 * 60 * 24;
const ACTIVE_WINDOW_DAYS = 30;

function monthKey(date: Date): string {
  return date.toLocaleString("en-US", { month: "short" });
}

function dayKey(date: Date): string {
  return date.toLocaleString("en-US", { month: "short", day: "numeric" });
}

/**
 * The dashboard's 7d/30d/90d/1y selector. Each range fixes both the window the
 * stat deltas compare against and the buckets the trend charts are built from,
 * so picking a range actually changes what the page shows.
 *
 * `bucketDays: 0` means calendar months, which do not have a fixed length.
 */
interface RangeSpec {
  key: string;
  days: number;
  buckets: number;
  bucketDays: number;
}

const RANGES: Record<string, RangeSpec> = {
  "7d": { key: "7d", days: 7, buckets: 7, bucketDays: 1 },
  "30d": { key: "30d", days: 30, buckets: 15, bucketDays: 2 },
  "90d": { key: "90d", days: 91, buckets: 13, bucketDays: 7 },
  "1y": { key: "1y", days: 365, buckets: 12, bucketDays: 0 },
};

const DEFAULT_RANGE = RANGES["1y"]!;

function resolveRange(raw: unknown): RangeSpec {
  return (typeof raw === "string" ? RANGES[raw] : undefined) ?? DEFAULT_RANGE;
}

interface Bucket {
  start: Date;
  end: Date;
  label: string;
}

function bucketsFor(spec: RangeSpec, now = new Date()): Bucket[] {
  const buckets: Bucket[] = [];

  if (spec.bucketDays === 0) {
    for (let i = spec.buckets - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      buckets.push({ start, end, label: monthKey(start) });
    }
    return buckets;
  }

  // Anchor to midnight tonight so the newest bucket is a whole day rather than
  // a partial one — a half-elapsed bucket reads as a cliff on every chart.
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const span = spec.bucketDays * DAY_MS;
  for (let i = spec.buckets - 1; i >= 0; i--) {
    const end = new Date(endOfToday.getTime() - i * span);
    const start = new Date(end.getTime() - span);
    buckets.push({ start, end, label: dayKey(start) });
  }
  return buckets;
}

/**
 * Percentage change helpers. Every "change" figure the dashboard shows is
 * computed against the previous period rather than hard-coded.
 */
function pctChange(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

router.get("/stats", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const range = resolveRange(req.query.range);
    const now = Date.now();
    const activeCutoff = new Date(now - ACTIVE_WINDOW_DAYS * DAY_MS);
    // The selected range is the period under review; the equally long span
    // before it is the baseline every "change" figure is measured against.
    const periodStart = new Date(now - range.days * DAY_MS);
    const previousStart = new Date(now - 2 * range.days * DAY_MS);

    const [customers, previousCustomerCount] = await Promise.all([
      prisma.customer.findMany({
        where: { tenantId },
        select: {
          mrr: true,
          healthScore: true,
          churnRisk: true,
          riskLevel: true,
          lastActiveAt: true,
          signupDate: true,
        },
      }),
      prisma.customer.count({ where: { tenantId, signupDate: { lt: periodStart } } }),
    ]);

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter((c) => c.lastActiveAt > activeCutoff).length;
    const atRiskCustomers = customers.filter(
      (c) => c.riskLevel === "high" || c.riskLevel === "critical"
    ).length;

    const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
    const avgHealth =
      totalCustomers > 0
        ? customers.reduce((sum, c) => sum + c.healthScore, 0) / totalCustomers
        : 0;
    const churnRate =
      totalCustomers > 0 ? ((totalCustomers - activeCustomers) / totalCustomers) * 100 : 0;

    // Previous-period baselines, derived from the same records: the accounts
    // that already existed when the period began, judged as of that moment.
    //
    // Keyed on signupDate, not createdAt: createdAt is when the row was written,
    // so a freshly imported book of business would look entirely brand new and
    // report a flat +100% against an empty baseline on every stat.
    const previousCohort = customers.filter((c) => c.signupDate < periodStart);
    const previousActive = previousCohort.filter(
      (c) => c.lastActiveAt > new Date(periodStart.getTime() - ACTIVE_WINDOW_DAYS * DAY_MS)
    ).length;
    const previousMrr = previousCohort.reduce((sum, c) => sum + c.mrr, 0);
    const previousHealth =
      previousCohort.length > 0
        ? previousCohort.reduce((sum, c) => sum + c.healthScore, 0) / previousCohort.length
        : 0;
    const previousChurnRate =
      previousCohort.length > 0
        ? ((previousCohort.length - previousActive) / previousCohort.length) * 100
        : 0;
    const previousAtRisk = previousCohort.filter(
      (c) => c.riskLevel === "high" || c.riskLevel === "critical"
    ).length;

    res.json({
      stats: {
        totalCustomers,
        totalCustomersChange: pctChange(totalCustomers, previousCustomerCount),
        activeCustomers,
        activeCustomersChange: pctChange(activeCustomers, previousActive),
        churnRate: Math.round(churnRate * 10) / 10,
        churnRateChange: Math.round((churnRate - previousChurnRate) * 10) / 10,
        mrr: Math.round(totalMrr * 100) / 100,
        mrrChange: pctChange(totalMrr, previousMrr),
        atRiskCustomers,
        atRiskChange: pctChange(atRiskCustomers, previousAtRisk),
        avgHealthScore: Math.round(avgHealth),
        avgHealthScoreChange: Math.round((avgHealth - previousHealth) * 10) / 10,
      },
      range: range.key,
      periodStart: periodStart.toISOString(),
      previousPeriodStart: previousStart.toISOString(),
      // Lets the UI show an onboarding state instead of a wall of zeros.
      hasData: totalCustomers > 0,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Churn trend over the selected range. Uses stored ChurnMetric rows when a
 * tenant has them and otherwise derives the series from customer activity, so
 * the chart always reflects real data rather than a mock series.
 */
router.get("/churn-trend", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const range = resolveRange(req.query.range);
    const buckets = bucketsFor(range);

    // Stored metrics are monthly, so they can only answer the yearly view.
    if (range.bucketDays === 0) {
      const metrics = await prisma.churnMetric.findMany({
        where: { tenantId },
        orderBy: { month: "asc" },
        take: range.buckets,
      });

      if (metrics.length > 0) {
        res.json({
          data: metrics.map((m) => ({
            month: m.month,
            churnRate: m.churnRate,
            predicted: m.predictedRate ?? m.churnRate,
          })),
          range: range.key,
          source: "metrics",
        });
        return;
      }
    }

    const customers = await prisma.customer.findMany({
      where: { tenantId },
      select: { signupDate: true, lastActiveAt: true, churnRisk: true },
    });

    if (customers.length === 0) {
      res.json({ data: [], range: range.key, source: "empty" });
      return;
    }

    // An account counts as churned in the bucket its last activity falls in,
    // but only once it has stayed quiet long enough to be considered gone —
    // otherwise every still-active customer reads as a fresh churn.
    const staleBefore = new Date(Date.now() - ACTIVE_WINDOW_DAYS * DAY_MS);

    const data = buckets.map(({ start, end, label }) => {
      const cohort = customers.filter((c) => c.signupDate < end);
      const churned = cohort.filter(
        (c) =>
          c.lastActiveAt >= start && c.lastActiveAt < end && c.lastActiveAt < staleBefore
      );

      const churnRate = cohort.length > 0 ? (churned.length / cohort.length) * 100 : 0;
      // Forward-looking figure from the model's current risk scores.
      const predicted =
        cohort.length > 0
          ? (cohort.reduce((sum, c) => sum + c.churnRisk, 0) / cohort.length) * 100
          : 0;

      return {
        month: label,
        churnRate: Math.round(churnRate * 10) / 10,
        predicted: Math.round(predicted * 10) / 10,
      };
    });

    res.json({ data, range: range.key, source: "derived" });
  } catch (err) {
    console.error("Churn trend error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/** Revenue series for the reports chart — previously mock-only on the client. */
router.get("/revenue", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const range = resolveRange(req.query.range);
    const buckets = bucketsFor(range);

    const customers = await prisma.customer.findMany({
      where: { tenantId },
      select: { mrr: true, signupDate: true, lastActiveAt: true, riskLevel: true },
    });

    if (customers.length === 0) {
      res.json({ data: [], range: range.key });
      return;
    }

    const staleBefore = new Date(Date.now() - ACTIVE_WINDOW_DAYS * DAY_MS);

    const data = buckets.map(({ start, end, label }) => {
      // Revenue on the books during the bucket: signed up by then, and not yet
      // gone quiet when it began.
      const active = customers.filter(
        (c) => c.signupDate < end && c.lastActiveAt >= start
      );
      const added = customers.filter(
        (c) => c.signupDate >= start && c.signupDate < end
      );
      // Same churn definition the trend chart uses, so the two agree.
      const lost = customers.filter(
        (c) =>
          c.signupDate < start &&
          c.lastActiveAt >= start &&
          c.lastActiveAt < end &&
          c.lastActiveAt < staleBefore
      );

      return {
        month: label,
        mrr: Math.round(active.reduce((sum, c) => sum + c.mrr, 0)),
        newRevenue: Math.round(added.reduce((sum, c) => sum + c.mrr, 0)),
        churnedRevenue: Math.round(lost.reduce((sum, c) => sum + c.mrr, 0)),
      };
    });

    res.json({ data, range: range.key });
  } catch (err) {
    console.error("Revenue error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/risk-distribution", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const levels = ["low", "medium", "high", "critical"];
    const colors: Record<string, string> = {
      low: "#10b981",
      medium: "#f59e0b",
      high: "#f97316",
      critical: "#ef4444",
    };

    const grouped = await prisma.customer.groupBy({
      by: ["riskLevel"],
      where: { tenantId },
      _count: { _all: true },
    });

    const counts = new Map(grouped.map((g) => [g.riskLevel, g._count._all]));
    const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0);

    res.json({
      distribution: levels.map((level) => {
        const count = counts.get(level) ?? 0;
        return {
          level: level.charAt(0).toUpperCase() + level.slice(1),
          count,
          percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
          color: colors[level],
        };
      }),
      total,
    });
  } catch (err) {
    console.error("Risk distribution error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/activity", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const events = await prisma.event.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { customer: { select: { name: true, company: true } } },
    });

    res.json({
      activity: events.map((e) => ({
        id: e.id,
        type: e.type,
        message: e.message,
        customer: e.customer?.company || e.customer?.name || "Workspace",
        timestamp: e.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("Activity error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/churn-reasons", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const events = await prisma.event.findMany({
      where: { tenantId, type: "churn" },
      select: { metadata: true },
      orderBy: { createdAt: "desc" },
      take: 500,
    });

    // Reasons live in the event metadata, so tally them in memory rather than
    // trying to group by a JSON key in SQL.
    const tally = new Map<string, number>();
    for (const event of events) {
      const metadata = event.metadata as { reason?: unknown } | null;
      const reason =
        typeof metadata?.reason === "string" ? metadata.reason.trim() : "";
      if (!reason) continue;
      tally.set(reason, (tally.get(reason) ?? 0) + 1);
    }

    const reasons = [...tally.entries()]
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    res.json({ reasons });
  } catch (err) {
    console.error("Churn reasons error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/usage", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const [tenant, customersTracked] = await Promise.all([
      prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { name: true, plan: true },
      }),
      prisma.customer.count({ where: { tenantId } }),
    ]);

    const plan = tenant?.plan ?? "free";
    const limit = config.planLimits[plan] ?? config.planLimits.free;

    res.json({
      usage: {
        plan,
        planLabel: `${plan.charAt(0).toUpperCase()}${plan.slice(1)} Plan`,
        customersTracked,
        limit,
        // null limit means unlimited, so there is no meaningful percentage.
        percentUsed:
          limit === null
            ? null
            : Math.min(100, Math.round((customersTracked / limit) * 100)),
      },
    });
  } catch (err) {
    console.error("Usage error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/at-risk", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const customers = await prisma.customer.findMany({
      where: { tenantId, riskLevel: { in: ["high", "critical"] } },
      orderBy: { churnRisk: "desc" },
      take: 10,
      include: {
        predictions: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { topFactors: true, createdAt: true },
        },
      },
    });

    res.json({
      customers: customers.map((c) => ({
        ...c,
        // Surfacing why each account is flagged makes the table actionable.
        topFactors: c.predictions[0]?.topFactors ?? [],
        predictions: undefined,
      })),
      atRiskMrr: Math.round(customers.reduce((sum, c) => sum + c.mrr, 0) * 100) / 100,
    });
  } catch (err) {
    console.error("At-risk error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
