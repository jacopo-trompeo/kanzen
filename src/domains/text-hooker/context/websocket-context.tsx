import { createContext, type PropsWithChildren, useContext } from "react";
import {
  useWebSocketClipboardMonitor,
  type WebSocketStatus,
} from "@/domains/text-hooker/hooks/use-web-socket-clipboard-monitor";

interface WebSocketContext {
  status: WebSocketStatus;
  connect: () => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContext | null>(null);

export function WebSocketProvider({ children }: PropsWithChildren) {
  const webSocket = useWebSocketClipboardMonitor();

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketContext be used within a WebSocketProvider");
  }
  return context;
}
