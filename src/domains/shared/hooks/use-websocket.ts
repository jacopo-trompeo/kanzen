import { useEffect, useRef, useState } from "react";
import type { WebSocketStatus } from "@/domains/shared/types/websocket";

export interface UseWebSocketOptions {
  url: string;
  onMessage?: (event: MessageEvent) => void;
}

export function useWebSocket(options: UseWebSocketOptions) {
  const { url, onMessage } = options;
  const [status, setStatus] = useState<WebSocketStatus>("DISCONNECTED");
  const webSocketRef = useRef<WebSocket | null>(null);
  const messageHandlerRef = useRef(onMessage);

  useEffect(() => {
    messageHandlerRef.current = onMessage;
  }, [onMessage]);

  function connect() {
    if (!url) return;
    if (
      webSocketRef.current?.readyState === WebSocket.OPEN ||
      webSocketRef.current?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    setStatus("CONNECTING");
    const webSocket = new WebSocket(url);
    webSocketRef.current = webSocket;

    webSocket.onopen = () => {
      setStatus("CONNECTED");
    };

    webSocket.onclose = () => {
      setStatus("DISCONNECTED");
      webSocketRef.current = null;
    };

    webSocket.onmessage = async (event) => {
      if (messageHandlerRef.current) {
        messageHandlerRef.current(event);
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
