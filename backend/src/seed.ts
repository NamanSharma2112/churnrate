import bcrypt from "bcryptjs";
import { prisma } from "./config/database.js";

const companies = [
  "Acme Corp", "TechFlow Inc", "DataWave", "CloudNine Labs", "Nexus Digital",
  "ByteForge", "PixelPerfect", "MegaSoft Corp", "Quantum Systems", "Streamline Co",
  "Horizon AI", "NovaTech", "PulseLabs", "Vertex Solutions", "ArcLight",
  "CipherNet", "EchoBase", "FusionStack", "GridPoint", "HyperLoop",
];

const plans = ["free", "starter", "pro", "enterprise"] as const;
const firstNames = ["Sarah", "Mike", "Emily", "David", "Lisa", "James", "Anna", "Tom", "Rachel", "Alex"];
const lastNames = ["Johnson", "Chen", "Rodriguez", "Park", "Wang", "Smith", "Kumar", "Taylor", "Brown", "Wilson"];

async function seed() {
  console.log("Seeding database...");

  await prisma.event.deleteMany();
  await prisma.prediction.deleteMany();
  await prisma.churnMetric.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  const tenant = await prisma.tenant.create({
    data: { name: "Demo Company", slug: "demo-company", plan: "pro" },
  });

  const passwordHash = await bcrypt.hash("password123", 12);
  await prisma.user.create({
    data: {
      email: "admin@churnrate.com",
      passwordHash,
      name: "Admin User",
      role: "admin",
      tenantId: tenant.id,
    },
  });

  const customers = [];
  for (let i = 0; i < 50; i++) {
    const plan = plans[Math.floor(Math.random() * plans.length)];
    const mrrMap = { free: 0, starter: 49, pro: 299, enterprise: 899 };
    const healthScore = Math.floor(Math.random() * 80) + 20;
    const churnRisk = parseFloat((Math.random()).toFixed(2));
    const riskLevel = churnRisk > 0.8 ? "critical" : churnRisk > 0.6 ? "high" : churnRisk > 0.4 ? "medium" : "low";
    const daysAgo = Math.floor(Math.random() * 60);
    const signupDaysAgo = Math.floor(Math.random() * 365) + 30;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[i % companies.length];

    const customer = await prisma.customer.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${company.toLowerCase().replace(/\s+/g, "")}.com`,
        company,
        plan,
        mrr: mrrMap[plan],
        healthScore,
        churnRisk,
        riskLevel,
        engagementTrend: healthScore > 60 ? "up" : healthScore > 40 ? "stable" : "down",
        lastActiveAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        signupDate: new Date(Date.now() - signupDaysAgo * 24 * 60 * 60 * 1000),
        tenantId: tenant.id,
      },
    });
    customers.push(customer);
  }

  const months = ["2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04"];
  for (const month of months) {
    await prisma.churnMetric.create({
      data: {
        tenantId: tenant.id,
        month,
        churnRate: parseFloat((Math.random() * 3 + 3).toFixed(1)),
        predictedRate: parseFloat((Math.random() * 3 + 2.5).toFixed(1)),
        totalCustomers: Math.floor(Math.random() * 2000 + 10000),
        churnedCount: Math.floor(Math.random() * 200 + 100),
        mrr: Math.floor(Math.random() * 50000 + 240000),
        churnedRevenue: Math.floor(Math.random() * 5000 + 10000),
        newRevenue: Math.floor(Math.random() * 5000 + 14000),
      },
    });
  }

  // Predictions carry the factor weights the ML Models page aggregates into
  // feature importance, so score a slice of the base.
  const featurePool = [
    { feature: "usage_drop", base: 0.82 },
    { feature: "health_score", base: 0.68 },
    { feature: "support_tickets", base: 0.55 },
    { feature: "days_since_active", base: 0.47 },
    { feature: "login_frequency", base: 0.39 },
    { feature: "mrr", base: 0.28 },
  ];

  for (const customer of customers.slice(0, 30)) {
    await prisma.prediction.create({
      data: {
        customerId: customer.id,
        probability: customer.churnRisk,
        riskLevel: customer.riskLevel,
        modelVersion: "seed-v1",
        topFactors: featurePool.map((f) => ({
          feature: f.feature,
          // Jitter each weight so the averages are not identical.
          impact: parseFloat(
            Math.min(0.99, Math.max(0.05, f.base + (Math.random() - 0.5) * 0.18)).toFixed(2)
          ),
        })),
      },
    });
  }

  // Churn reasons are read from event metadata by /api/dashboard/churn-reasons.
  const churnReasons = [
    "Price Too High",
    "Missing Features",
    "Poor Support",
    "Switched to Competitor",
    "Company Closed",
  ];

  const eventTypes = ["churn", "signup", "upgrade", "downgrade", "warning"];
  const messages: Record<string, string[]> = {
    churn: ["Customer churned after subscription ended", "Customer canceled plan"],
    signup: ["New customer onboarded", "New enterprise customer signed up"],
    upgrade: ["Upgraded from Starter to Pro", "Upgraded from Pro to Enterprise"],
    downgrade: ["Downgraded from Pro to Starter", "Downgraded from Enterprise to Pro"],
    warning: ["Health score dropped below 40", "No login activity in 14 days", "Support tickets increasing"],
  };

  for (let i = 0; i < 20; i++) {
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const msgs = messages[type];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    await prisma.event.create({
      data: {
        type,
        message: msgs[Math.floor(Math.random() * msgs.length)],
        customerId: customer.id,
        tenantId: tenant.id,
        metadata:
          type === "churn"
            ? { reason: churnReasons[Math.floor(Math.random() * churnReasons.length)] }
            : {},
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      },
    });
  }

  // A wider run of historical churn events so the reason breakdown has shape.
  // Weights make the distribution look like a real cancellation survey.
  const reasonWeights = [35, 26, 20, 13, 6];
  let churnEvents = 0;
  for (let i = 0; i < 100; i++) {
    let roll = Math.random() * reasonWeights.reduce((a, b) => a + b, 0);
    let idx = 0;
    while (idx < reasonWeights.length - 1 && roll > reasonWeights[idx]) {
      roll -= reasonWeights[idx];
      idx += 1;
    }

    const customer = customers[Math.floor(Math.random() * customers.length)];
    await prisma.event.create({
      data: {
        type: "churn",
        message: messages.churn[Math.floor(Math.random() * messages.churn.length)],
        customerId: customer.id,
        tenantId: tenant.id,
        metadata: { reason: churnReasons[idx] },
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 180 * 24 * 60 * 60 * 1000)),
      },
    });
    churnEvents += 1;
  }

  console.log("Seeding complete!");
  console.log(
    `Created: 1 tenant, 1 user, ${customers.length} customers, ${months.length} metrics, 30 predictions, ${20 + churnEvents} events`
  );
  console.log("Login: admin@churnrate.com / password123");
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
