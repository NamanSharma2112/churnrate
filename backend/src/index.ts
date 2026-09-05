import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { createServer } from "http";
import { config } from "./config/index.js";
import { prisma } from "./config/database.js";
import { initWebSocket } from "./services/websocket.js";
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customers.js";
import dashboardRoutes from "./routes/dashboard.js";
import predictionRoutes from "./routes/predictions.js";
import dataIngestionRoutes from "./routes/data-ingestion.js";
import integrationRoutes from "./routes/integrations.js";

const app = express();
const httpServer = createServer(app);

app.set("trust proxy", 1);

app.use(
  cors({
    // Allow requests with no Origin (curl, health checks) and any configured origin.
    origin(origin, callback) {
      if (!origin || config.corsOrigins.includes("*") || config.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);

// The Stripe webhook verifies a signature over the exact bytes Stripe sent, so
// it must not be JSON-parsed. Everything else needs a parsed body — skipping the
// parser for the whole integrations router would leave those handlers with an
// empty `req.body`.
const STRIPE_WEBHOOK_PATH = "/api/integrations/stripe/webhook";
const jsonParser = express.json({ limit: "50mb" });

app.use((req, res, next) => {
  if (req.path === STRIPE_WEBHOOK_PATH) {
    next();
    return;
  }
  jsonParser(req, res, next);
});

app.get("/api/health", async (_req, res) => {
  let database = "ok";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = "unavailable";
  }

  let mlService = "unknown";
  try {
    const response = await fetch(`${config.mlServiceUrl}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    mlService = response.ok ? "ok" : "unavailable";
  } catch {
    mlService = "unavailable";
  }

  res.status(database === "ok" ? 200 : 503).json({
    status: database === "ok" ? "ok" : "degraded",
    database,
    mlService,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/data", dataIngestionRoutes);
app.use("/api/integrations", integrationRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Without this, a throw inside a handler ends the request with an empty body and
// the client sees an opaque network error.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  if (res.headersSent) return;
  const message =
    err instanceof Error && err.message.includes("CORS")
      ? err.message
      : "Internal server error";
  res.status(500).json({ message });
};
app.use(errorHandler);

initWebSocket(httpServer);

async function start() {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL");

    httpServer.listen(config.port, () => {
      console.log(`Backend server running on port ${config.port}`);
      console.log(`WebSocket server ready`);
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Allowed origins: ${config.corsOrigins.join(", ")}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

async function shutdown() {
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
