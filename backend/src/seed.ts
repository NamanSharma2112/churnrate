/**
 * Demo data for local development.
 *
 * Customers are given plausible signals and then scored by the real model, so
 * the seeded dashboard shows the same numbers the product would actually
 * produce. An earlier version wrote random churn scores and churn-metric rows
 * whose revenue bore no relation to the seeded customers.
 */
import bcrypt from "bcryptjs";
import { prisma } from "./config/database.js";
import { scoreAndPersist } from "./services/scoring-runner.js";
import { deriveHealthScore } from "./services/churn-scoring.js";

const companies = [
  "Acme Corp", "TechFlow Inc", "DataWave", "CloudNine Labs", "Nexus Digital",
  "ByteForge", "PixelPerfect", "MegaSoft Corp", "Quantum Systems", "Streamline Co",
  "Horizon AI", "NovaTech", "PulseLabs", "Vertex Solutions", "ArcLight",
  "CipherNet", "EchoBase", "FusionStack", "GridPoint", "HyperLoop",
];

const plans = ["free", "starter", "pro", "enterprise"] as const;
const mrrByPlan: Record<(typeof plans)[number], number> = {
  free: 0,
  starter: 49,
  pro: 299,
  enterprise: 899,
};

const firstNames = ["Sarah", "Mike", "Emily", "David", "Lisa", "James", "Anna", "Tom", "Rachel", "Alex"];
const lastNames = ["Johnson", "Chen", "Rodriguez", "Park", "Wang", "Smith", "Kumar", "Taylor", "Brown", "Wilson"];

const DAY_MS = 24 * 60 * 60 * 1000;

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed() {
  console.log("Seeding database...");

  await prisma.event.deleteMany();
  await prisma.prediction.deleteMany();
  await prisma.churnMetric.deleteMany();
  await prisma.importBatch.deleteMany();
  await prisma.integration.deleteMany();
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

  const customerIds: string[] = [];

  for (let i = 0; i < 50; i++) {
    const plan = pick(plans);
    const company = companies[i % companies.length];
    const firstName = pick(firstNames);
    const lastName = pick(lastNames);

    // A quarter of the book is deliberately unhealthy so the at-risk views have
    // something to show.
    const struggling = Math.random() < 0.25;

    const daysSinceActive = struggling ? randomInt(45, 220) : randomInt(0, 20);
    const signupDaysAgo = randomInt(daysSinceActive + 30, 900);
    const supportTickets = struggling ? randomInt(5, 18) : randomInt(0, 3);
    const loginFrequency = struggling ? randomInt(0, 3) : randomInt(8, 40);
    const npsScore = struggling ? randomInt(0, 4) : randomInt(7, 10);
    const featureUsagePct = struggling ? randomInt(2, 30) : randomInt(45, 95);

    const signals = {
      mrr: mrrByPlan[plan],
      plan,
      healthScore: 50,
      signupDate: new Date(Date.now() - signupDaysAgo * DAY_MS),
      lastActiveAt: new Date(Date.now() - daysSinceActive * DAY_MS),
      supportTickets,
      featureUsagePct,
      loginFrequency,
      npsScore,
    };

    const customer = await prisma.customer.create({
      data: {
        ...signals,
        id: undefined,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${company
          .toLowerCase()
          .replace(/\s+/g, "")}.com`,
        company,
        // Derived from the signals above rather than a random number.
        healthScore: deriveHealthScore({ id: "seed", ...signals }),
        engagementTrend:
          daysSinceActive <= 3 ? "up" : daysSinceActive >= 21 ? "down" : "stable",
        source: "seed",
        tenantId: tenant.id,
      },
    });

    customerIds.push(customer.id);
  }

  const eventTypes = ["churn", "signup", "upgrade", "downgrade", "warning"] as const;
  const messages: Record<(typeof eventTypes)[number], string[]> = {
    churn: ["Customer churned after subscription ended", "Customer canceled plan"],
    signup: ["New customer onboarded", "New enterprise customer signed up"],
    upgrade: ["Upgraded from Starter to Pro", "Upgraded from Pro to Enterprise"],
    downgrade: ["Downgraded from Pro to Starter", "Downgraded from Enterprise to Pro"],
    warning: ["Health score dropped below 40", "No login activity in 14 days", "Support tickets increasing"],
  };

  for (let i = 0; i < 20; i++) {
    const type = pick(eventTypes);
    await prisma.event.create({
      data: {
        type,
        message: pick(messages[type]),
        customerId: pick(customerIds),
        tenantId: tenant.id,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * DAY_MS)),
      },
    });
  }

  console.log("Scoring seeded customers...");
  const scoring = await scoreAndPersist(tenant.id);

  console.log("Seeding complete!");
  console.log(
    `Created: 1 tenant, 1 user, ${customerIds.length} customers, 20 events`
  );
  console.log(
    `Scored ${scoring.scored} customers (${scoring.atRisk} at risk) with ${
      scoring.modelVersion ?? "the fallback scorer"
    }`
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
