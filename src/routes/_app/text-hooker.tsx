import { createFileRoute } from "@tanstack/react-router";
import { WebSocketProvider } from "@/domains/shared/context/websocket-context";
import { addLogEntry } from "@/domains/text-hooker/functions/text-log-db";
import { useClipboardInserterMonitor } from "@/domains/text-hooker/hooks/use-clipboard-inserter-monitor";
import {
  settingsQueryOptions,
  useTextHookerSettings,
} from "@/domains/text-hooker/hooks/use-text-hooker-settings";
import { LogPendingPlaceholder } from "@/domains/text-hooker/ui/log-pending-placeholder";
import { TextLogList } from "@/domains/text-hooker/ui/text-log-list";
import { LogListToolbar } from "@/domains/text-hooker/ui/toolbar/log-list-toolbar";

export const Route = createFileRoute("/_app/text-hooker")({
  component: TextHookerPage,
  pendingComponent: () => <LogPendingPlaceholder />,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(settingsQueryOptions);
  },
});

function TextHookerShell() {
  useClipboardInserterMonitor();

  return (
    <main className="relative w-full">
      <TextLogList />
      <LogListToolbar className="fixed right-10 bottom-5" />
    </main>
  );
}

function TextHookerPage() {
  const { settings } = useTextHookerSettings();

  async function addLogEntryFromWebSocket(event: MessageEvent) {
    const text = event.data?.trim();
    if (text && typeof text === "string") {
      await addLogEntry(text);
    }
  }

  return (
    <WebSocketProvider
      url={settings?.webSocketUrl || ""}
      onMessage={addLogEntryFromWebSocket}
    >
      <TextHookerShell />
    </WebSocketProvider>
  );
}
