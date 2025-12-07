import { useCallback, useEffect, useRef, useState } from "react";

export function useWebSocketClipboardMonitor() {
  const [status, setStatus] = useState<"connected" | "disconnected" | "error">(
    "disconnected",
  );
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (
      wsRef.current?.readyState === WebSocket.OPEN ||
      wsRef.current?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    wsRef.current = new WebSocket("ws://localhost:6677");

    wsRef.current.onopen = () => {
      setStatus("connected");
    };

    wsRef.current.onmessage = (event) => {
      const text = event.data;
      if (typeof text === "string" && text.trim()) {
        // addLineToClipboardStore(text.trim());
      }
    };

    wsRef.current.onclose = () => {
      setStatus("disconnected");
      wsRef.current = null;
    };

    wsRef.current.onerror = () => {
      setStatus("error");
      wsRef.current?.close();
    };
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        wsRef.current.onmessage = null;
        wsRef.current.onopen = null;
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return { status };
}
