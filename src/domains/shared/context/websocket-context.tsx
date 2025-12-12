import { createContext, type PropsWithChildren, useContext } from "react";
import {
  type UseWebSocketOptions,
  useWebSocket,
} from "@/domains/shared/hooks/use-websocket";
import type { WebSocketStatus } from "@/domains/shared/types/websocket";

interface WebSocketContextValue {
  status: WebSocketStatus;
  connect: () => void;
  disconnect: () => void;
}

interface WebSocketProviderProps
  extends UseWebSocketOptions,
    PropsWithChildren {}

const WebSocketContextValue = createContext<WebSocketContextValue | null>(null);

export function WebSocketProvider(props: WebSocketProviderProps) {
  const { url, onMessage, children } = props;
  const webSocket = useWebSocket({ url, onMessage });

  return (
    <WebSocketContextValue.Provider value={webSocket}>
      {children}
    </WebSocketContextValue.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContextValue);
  if (!context) {
    throw new Error("useWebSocketContext be used within a WebSocketProvider");
  }
  return context;
}
