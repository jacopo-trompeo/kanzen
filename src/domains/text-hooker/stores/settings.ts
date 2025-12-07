import { Store } from "@tanstack/react-store";
import type { TextHookerSettingsStore } from "@/domains/text-hooker/types";

export const textHookerSettingsStore = new Store<TextHookerSettingsStore>({
  fontSize: 20,
  webhookUrl: "",
});

export function updateTextHookerStoreSettings(
  updates: Partial<TextHookerSettingsStore>,
) {
  textHookerSettingsStore.setState((prev) => ({
    ...prev,
    ...updates,
  }));
}
