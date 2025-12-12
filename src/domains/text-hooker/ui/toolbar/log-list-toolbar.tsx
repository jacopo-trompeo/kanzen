import { cn } from "@/domains/shared/lib/utils";
import { ClearLogButton } from "./clear-log-button";
import { ConnectWebSocketButton } from "./connect-websocket-button";
import { DeleteLastEntryButton } from "./delete-last-entry-button";
import { DisconnectWebSocketButton } from "./disconnect-websocket-button";
import { FontSizeInput } from "./fontsize-input";
import { WebSocketUrlInput } from "./websocket-url-input";

interface LogListToolbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LogListToolbar(props: LogListToolbarProps) {
  const { className, ...rest } = props;

  return (
    <div
      {...rest}
      className={cn(
        "flex items-center gap-4 rounded border bg-primary-foreground px-10 py-5",
        className,
      )}
    >
      <ClearLogButton />
      <DeleteLastEntryButton />
      <DisconnectWebSocketButton />
      <ConnectWebSocketButton />
      <WebSocketUrlInput />
      <FontSizeInput />
    </div>
  );
}
