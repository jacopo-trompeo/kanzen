import { createFileRoute } from "@tanstack/react-router";
import { getFromLocalStorage } from "@/domains/shared/functions/local-storage";
import { useClipboardInserterMonitor } from "@/domains/text-hooker/hooks/use-clipboard-inserter-monitor";
import { useWebSocketClipboardMonitor } from "@/domains/text-hooker/hooks/use-websocket-clipboard-monitor";
import { clipboardStore } from "@/domains/text-hooker/stores/clipboard";
import type { Line } from "@/domains/text-hooker/types";
import { CLIPBOARD_STORAGE_KEY } from "@/domains/text-hooker/types/constants";
import { ClipboardText } from "@/domains/text-hooker/ui/clipboard-text";
import { TextHookerPending } from "@/domains/text-hooker/ui/text-hooker-pending";

export const Route = createFileRoute("/_app/text-hooker")({
  component: TextHookerPage,
  pendingComponent: () => <TextHookerPending />,
  ssr: false,
  beforeLoad: () => {
    const stored = getFromLocalStorage<Line[]>(CLIPBOARD_STORAGE_KEY) ?? [];
    clipboardStore.setState({ clipboardText: stored });
  },
});

function TextHookerPage() {
  const { status } = useWebSocketClipboardMonitor();
  useClipboardInserterMonitor({
    disabled: status === "connected",
  });

  return <ClipboardText />;
}
