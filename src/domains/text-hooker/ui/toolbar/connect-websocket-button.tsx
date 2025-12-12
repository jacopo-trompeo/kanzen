import { Play } from "lucide-react";
import { useWebSocketContext } from "@/domains/shared/context/websocket-context";
import { ToolbarButton } from "./toolbar-button";

export function ConnectWebSocketButton() {
  const { connect, status } = useWebSocketContext();

  return (
    <ToolbarButton
      onClick={() => connect()}
      className={status === "CONNECTED" ? "text-green-500" : ""}
    >
      <Play />
    </ToolbarButton>
  );
}
