import { createFileRoute } from "@tanstack/react-router";
import { WebSocketProvider } from "@/domains/text-hooker/context/websocket-context";
import { settingsQueryOptions } from "@/domains/text-hooker/hooks/use-text-hooker-settings";
import { LogListToolbar } from "@/domains/text-hooker/ui/log-list-toolbar";
import { LogPendingPlaceholder } from "@/domains/text-hooker/ui/log-pending-placeholder";
import { TextLogList } from "@/domains/text-hooker/ui/text-log-list";

export const Route = createFileRoute("/_app/text-hooker")({
  component: TextHookerPage,
  pendingComponent: () => <LogPendingPlaceholder />,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(settingsQueryOptions);
  },
});

function TextHookerPage() {
  return (
    <WebSocketProvider>
      <main className="relative w-full">
        <TextLogList />
        <LogListToolbar className="fixed right-10 bottom-5" />
      </main>
    </WebSocketProvider>
  );
}
