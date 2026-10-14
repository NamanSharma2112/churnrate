"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

// No localhost fallback: a deployment with no realtime server (e.g. the API on
// Vercel functions, which cannot hold a WebSocket open) leaves this unset, and the
// hook then stays idle rather than retrying a dead endpoint forever.
const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

export function useSocket(token: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token || !WS_URL) return;

    const socket = io(WS_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  return { socket: socketRef.current, connected };
}
