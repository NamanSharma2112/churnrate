import express from "express";
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

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/data", dataIngestionRoutes);

initWebSocket(httpServer);

async function start() {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL");

    httpServer.listen(config.port, () => {
      console.log(`Backend server running on http://localhost:${config.port}`);
      console.log(`WebSocket server ready`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
