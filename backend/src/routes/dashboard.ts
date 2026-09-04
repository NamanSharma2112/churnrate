import { Router } from "express";
import { prisma } from "../config/database.js";
import { authenticate } from "../middleware/auth.js";
import { config } from "../config/index.js";

const router = Router();

router.use(authenticate);

router.get("/stats", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;

    const [totalCustomers, atRiskCustomers, customers] = await Promise.all([
      prisma.customer.count({ where: { tenantId } }),
      prisma.customer.count({ where: { tenantId, riskLevel: { in: ["high", "critical"] } } }),
      prisma.customer.findMany({
        where: { tenantId },
        select: { mrr: true, healthScore: true, churnRisk: true, lastActiveAt: true },
      }),
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeCustomers = customers.filter(
      (c) => new Date(c.lastActiveAt) > thirtyDaysAgo
    ).length;

    const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
    const avgHealth =
      customers.length > 0
        ? customers.reduce((sum, c) => sum + c.healthScore, 0) / customers.length
        : 0;
    const churnRate =
      totalCustomers > 0
        ? ((totalCustomers - activeCustomers) / totalCustomers) * 100
        : 0;

    res.json({
      stats: {
        totalCustomers,
        totalCustomersChange: 3.2,
        activeCustomers,
        activeCustomersChange: 1.8,
        churnRate: parseFloat(churnRate.toFixed(1)),
        churnRateChange: -0.8,
        mrr: totalMrr,
        mrrChange: 5.4,
        atRiskCustomers,
        atRiskChange: -12,
        avgHealthScore: parseFloat(avgHealth.toFixed(0)),
        avgHealthScoreChange: 2.1,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/churn-trend", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const metrics = await prisma.churnMetric.findMany({
      where: { tenantId },
      orderBy: { month: "asc" },
      take: 12,
    });

    res.json({
      data: metrics.map((m) => ({
        month: m.month,
        churnRate: m.churnRate,
        predicted: m.predictedRate,
      })),
    });
  } catch (err) {
    console.error("Churn trend error:", err);
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

    const total = await prisma.customer.count({ where: { tenantId } });
    const distribution = await Promise.all(
      levels.map(async (level) => {
        const count = await prisma.customer.count({
          where: { tenantId, riskLevel: level },
        });
        return {
          level: level.charAt(0).toUpperCase() + level.slice(1),
          count,
          percentage: total > 0 ? parseFloat(((count / total) * 100).toFixed(1)) : 0,
          color: colors[level],
        };
      })
    );

    res.json({ distribution });
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
        customer: e.customer?.company || e.customer?.name || "Unknown",
        timestamp: e.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("Activity error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/revenue", async (req, res) => {
  try {
    const tenantId = req.user!.tenantId;
    const metrics = await prisma.churnMetric.findMany({
      where: { tenantId },
      orderBy: { month: "asc" },
      take: 12,
    });

    res.json({
      data: metrics.map((m) => ({
        month: m.month,
        mrr: m.mrr,
        churnedRevenue: m.churnedRevenue,
        newRevenue: m.newRevenue,
      })),
    });
  } catch (err) {
    console.error("Revenue error:", err);
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
    });

    res.json({ customers });
  } catch (err) {
    console.error("At-risk error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
