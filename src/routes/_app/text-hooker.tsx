import { createFileRoute } from "@tanstack/react-router";
import { getTextHookerSettings } from "@/domains/text-hooker/functions/get-text-hooker-settings";
import { useClipboardInserterMonitor } from "@/domains/text-hooker/hooks/use-clipboard-inserter-monitor";
import { useWebSocketClipboardMonitor } from "@/domains/text-hooker/hooks/use-websocket-clipboard-monitor";
import { updateTextHookerStoreSettings } from "@/domains/text-hooker/stores/settings";
import { LogListToolbar } from "@/domains/text-hooker/ui/log-list-toolbar";
import { LogPendingPlaceholder } from "@/domains/text-hooker/ui/log-pending-placeholder";
import { TextLogList } from "@/domains/text-hooker/ui/text-log-list";

export const Route = createFileRoute("/_app/text-hooker")({
  component: TextHookerPage,
  pendingComponent: () => <LogPendingPlaceholder />,
  ssr: false,
  loader: async () => {
    const settings = await getTextHookerSettings();
    return { settings };
  },
});

function TextHookerPage() {
  const { settings } = Route.useLoaderData();
  const { status } = useWebSocketClipboardMonitor();
  useClipboardInserterMonitor({
    disabled: status === "connected",
  });

  updateTextHookerStoreSettings({
    fontSize: settings?.fontSize,
  });

  return (
    <main className="relative w-full">
      <TextLogList />
      <LogListToolbar className="fixed right-10 bottom-5" />
    </main>
  );
}
