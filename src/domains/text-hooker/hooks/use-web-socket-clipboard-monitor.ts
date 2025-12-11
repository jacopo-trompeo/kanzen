import { useEffect, useRef, useState } from "react";
import { addLogEntry } from "@/domains/text-hooker/functions/text-log-db";
import { useTextHookerSettings } from "./use-text-hooker-settings";

export type WebSocketStatus =
  | "DISCONNECTED"
  | "CONNECTING"
  | "CONNECTED"
  | "ERROR";

export function useWebSocketClipboardMonitor() {
  const [status, setStatus] = useState<WebSocketStatus>("DISCONNECTED");
  const webSocketRef = useRef<WebSocket | null>(null);
  const { settings } = useTextHookerSettings();

  function connect() {
    if (!settings?.webSocketUrl) return;
    if (
      webSocketRef.current?.readyState === WebSocket.OPEN ||
      webSocketRef.current?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    setStatus("CONNECTING");
    const webSocket = new WebSocket(settings.webSocketUrl);
    webSocketRef.current = webSocket;

    webSocket.onopen = () => {
      setStatus("CONNECTED");
    };

    webSocket.onclose = () => {
      setStatus("DISCONNECTED");
      webSocketRef.current = null;
    };

    webSocket.onmessage = async (event) => {
      const text = event.data;
      if (typeof text === "string" && text.trim()) {
        await addLogEntry(text.trim());
      }
    };

    webSocket.onerror = () => {
      setStatus("ERROR");
      webSocket.close();
    };
  }

  function disconnect() {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
  }

  useEffect(() => {
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  return {
    status,
    connect,
    disconnect,
  };
}
