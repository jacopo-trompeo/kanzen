import { Square } from "lucide-react";
import { useWebSocketContext } from "@/domains/shared/context/websocket-context";
import { ToolbarButton } from "./toolbar-button";

export function DisconnectWebSocketButton() {
  const { disconnect, status } = useWebSocketContext();

  return (
    <ToolbarButton
      onClick={() => disconnect()}
      className={status === "DISCONNECTED" ? "text-red-500" : ""}
    >
      <Square />
    </ToolbarButton>
  );
}
