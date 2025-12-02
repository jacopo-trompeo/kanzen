import { Store } from "@tanstack/react-store";
import { setToLocalStorage } from "@/domains/shared/functions/local-storage";
import type { Line } from "@/domains/text-hooker/types";
import { CLIPBOARD_STORAGE_KEY } from "@/domains/text-hooker/types/constants";

interface ClipboardStore {
  clipboardText: Line[];
}

export const clipboardStore = new Store<ClipboardStore>({
  clipboardText: [],
});

export function addLineToClipboardStore(text: string) {
  clipboardStore.setState((prev) => {
    const newLine: Line = {
      id: crypto.randomUUID(),
      text,
    };
    const newLines = [...prev.clipboardText, newLine];

    setToLocalStorage(CLIPBOARD_STORAGE_KEY, newLines);
    return { clipboardText: newLines };
  });
}

export function deleteLineFromClipboardStore(id: string) {
  clipboardStore.setState((prev) => {
    const newLines = prev.clipboardText.filter((line) => line.id !== id);
    setToLocalStorage(CLIPBOARD_STORAGE_KEY, newLines);
    return { clipboardText: newLines };
  });
}

export function clearClipboardStore() {
  clipboardStore.setState({ clipboardText: [] });
  setToLocalStorage(CLIPBOARD_STORAGE_KEY, []);
}
