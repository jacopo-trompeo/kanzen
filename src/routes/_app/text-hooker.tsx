import { createFileRoute } from "@tanstack/react-router";
import { getFromLocalStorage } from "@/domains/shared/functions/local-storage";
import { useClipboardText } from "@/domains/text-hooker/hooks/use-clipboard-text";
import type { Line } from "@/domains/text-hooker/types";
import { STORAGE_KEY } from "@/domains/text-hooker/types/constants";
import { ClipboardText } from "@/domains/text-hooker/ui/clipboard-text";
import { TextHookerPending } from "@/domains/text-hooker/ui/text-hooker-pending";

export const Route = createFileRoute("/_app/text-hooker")({
  component: TextHookerPage,
  pendingComponent: () => <TextHookerPending />,
  ssr: false,
  loader: () => {
    const stored = getFromLocalStorage<Line[]>(STORAGE_KEY) ?? [];
    return { stored };
  },
});

function TextHookerPage() {
  const { stored } = Route.useLoaderData();
  const lines = useClipboardText(stored);

  return (
    <div>
      <ClipboardText lines={lines} />
    </div>
  );
}
