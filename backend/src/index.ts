import { createServer } from "http";
import app from "./app.js";
import { config } from "./config/index.js";
import { prisma } from "./config/database.js";
import { initWebSocket } from "./services/websocket.js";

const httpServer = createServer(app);

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
