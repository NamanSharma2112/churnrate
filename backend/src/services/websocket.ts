import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import type { AuthPayload } from "../middleware/auth.js";

let io: SocketServer | null = null;

export function initWebSocket(httpServer: HttpServer): SocketServer {
  io = new SocketServer(httpServer, {
    cors: {
      origin: config.corsOrigins,
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication required"));
    }

    try {
      const payload = jwt.verify(token, config.jwt.secret) as AuthPayload;
      socket.data.user = payload;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const { tenantId } = socket.data.user;
    socket.join(`tenant:${tenantId}`);

    console.log(`Client connected: ${socket.id} (tenant: ${tenantId})`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function getIO(): SocketServer | null {
  return io;
}

export function emitToTenant(
  tenantId: string,
  event: string,
  data: unknown
): void {
  if (io) {
    io.to(`tenant:${tenantId}`).emit(event, data);
  }
}
