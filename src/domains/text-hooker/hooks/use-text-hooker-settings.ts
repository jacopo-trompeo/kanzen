import { useStore } from "@tanstack/react-store";
import { textHookerSettingsStore } from "@/domains/text-hooker/stores/settings";

export function useTextHookerSettings() {
  return useStore(textHookerSettingsStore);
}
