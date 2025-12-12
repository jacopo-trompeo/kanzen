import { Input } from "@/domains/shared/components/ui/input";
import { useDebouncedState } from "@/domains/shared/hooks/use-debounced-state";
import { useTextHookerSettings } from "@/domains/text-hooker/hooks/use-text-hooker-settings";

export function WebSocketUrlInput() {
  const { settings, updateSettings } = useTextHookerSettings();
  const [webSocketUrl, setWebSocketUrl] = useDebouncedState(
    settings?.webSocketUrl,
    {
      onUpdate: async (newUrl) => {
        await updateSettings.mutateAsync({
          data: {
            webSocketUrl: newUrl,
          },
        });
      },
    },
  );

  return (
    <Input
      type="text"
      className="w-60"
      value={webSocketUrl ?? ""}
      onChange={(e) => setWebSocketUrl(e.target.value)}
    />
  );
}
