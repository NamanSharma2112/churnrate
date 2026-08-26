import { Router } from "express";
import { prisma } from "../config/database.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

const DAY_MS = 1000 * 60 * 60 * 24;
const ACTIVE_WINDOW_DAYS = 30;

function monthKey(date: Date): string {
  return date.toLocaleString("en-US", { month: "short" });
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
    const now = Date.now();
    const activeCutoff = new Date(now - ACTIVE_WINDOW_DAYS * DAY_MS);
    const periodStart = new Date(now - 30 * DAY_MS);
    const previousStart = new Date(now - 60 * DAY_MS);

    const [customers, previousCustomerCount] = await Promise.all([
      prisma.customer.findMany({
        where: { tenantId },
        select: {
          mrr: true,
          healthScore: true,
          churnRisk: true,
          riskLevel: true,
          lastActiveAt: true,
          createdAt: true,
        },
      }),
      prisma.customer.count({ where: { tenantId, createdAt: { lt: periodStart } } }),
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

    // Previous-period baselines, derived from the same records.
    const previousCohort = customers.filter((c) => c.createdAt < periodStart);
    const previousActive = previousCohort.filter(
      (c) => c.lastActiveAt > new Date(now - 60 * DAY_MS)
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

    void previousStart;

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
      // Lets the UI show an onboarding state instead of a wall of zeros.
      hasData: totalCustomers > 0,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Twelve-month churn trend. Uses stored ChurnMetric rows when a tenant has them
 * and otherwise derives the series from customer activity, so the chart always
 * reflects real data rather than a mock series.
 */
router.get("/churn-trend", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;

    const metrics = await prisma.churnMetric.findMany({
      where: { tenantId },
      orderBy: { month: "asc" },
      take: 12,
    });

    if (metrics.length > 0) {
      res.json({
        data: metrics.map((m) => ({
          month: m.month,
          churnRate: m.churnRate,
          predicted: m.predictedRate ?? m.churnRate,
        })),
        source: "metrics",
      });
      return;
    }

    const customers = await prisma.customer.findMany({
      where: { tenantId },
      select: { signupDate: true, lastActiveAt: true, churnRisk: true },
    });

    if (customers.length === 0) {
      res.json({ data: [], source: "empty" });
      return;
    }

    const now = new Date();
    const data = [];

    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      // Customers who existed during the month.
      const cohort = customers.filter((c) => c.signupDate < monthEnd);
      // Those whose last activity fell before the month ended and never resumed.
      const lapsed = cohort.filter(
        (c) => c.lastActiveAt < monthStart && c.lastActiveAt >= new Date(monthStart.getTime() - 30 * DAY_MS)
      );

      const churnRate = cohort.length > 0 ? (lapsed.length / cohort.length) * 100 : 0;
      // Forward-looking figure from the model's current risk scores.
      const predicted =
        cohort.length > 0
          ? (cohort.reduce((sum, c) => sum + c.churnRisk, 0) / cohort.length) * 100
          : 0;

      data.push({
        month: monthKey(monthStart),
        churnRate: Math.round(churnRate * 10) / 10,
        predicted: Math.round(predicted * 10) / 10,
      });
    }

    res.json({ data, source: "derived" });
  } catch (err) {
    console.error("Churn trend error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/** Revenue series for the reports chart — previously mock-only on the client. */
router.get("/revenue", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const customers = await prisma.customer.findMany({
      where: { tenantId },
      select: { mrr: true, signupDate: true, lastActiveAt: true, riskLevel: true },
    });

    if (customers.length === 0) {
      res.json({ data: [] });
      return;
    }

    const now = new Date();
    const data = [];

    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const activeThatMonth = customers.filter(
        (c) => c.signupDate < monthEnd && c.lastActiveAt >= monthStart
      );
      const newThatMonth = customers.filter(
        (c) => c.signupDate >= monthStart && c.signupDate < monthEnd
      );
      const lostThatMonth = customers.filter(
        (c) =>
          c.signupDate < monthStart &&
          c.lastActiveAt >= new Date(monthStart.getTime() - 30 * DAY_MS) &&
          c.lastActiveAt < monthStart
      );

      data.push({
        month: monthKey(monthStart),
        mrr: Math.round(activeThatMonth.reduce((sum, c) => sum + c.mrr, 0)),
        newRevenue: Math.round(newThatMonth.reduce((sum, c) => sum + c.mrr, 0)),
        churnedRevenue: Math.round(lostThatMonth.reduce((sum, c) => sum + c.mrr, 0)),
      });
    }

    res.json({ data });
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
