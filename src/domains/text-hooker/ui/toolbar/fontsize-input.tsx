import { Input } from "@/domains/shared/components/ui/input";
import { useDebouncedState } from "@/domains/shared/hooks/use-debounced-state";
import { useTextHookerSettings } from "@/domains/text-hooker/hooks/use-text-hooker-settings";

export function FontSizeInput() {
  const { settings, updateSettings } = useTextHookerSettings();
  const [fontSize, setFontSize] = useDebouncedState(settings?.fontSize, {
    onUpdate: async (newFontSize) => {
      await updateSettings.mutateAsync({
        fontSize: newFontSize,
      });
    },
  });

  return (
    <Input
      type="number"
      className="w-24"
      min={1}
      value={fontSize}
      onChange={(e) => setFontSize(+e.target.value)}
    />
  );
}
