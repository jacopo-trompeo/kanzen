import { useStore } from "@tanstack/react-store";
import { clipboardStore } from "@/domains/text-hooker/stores/clipboard";
import { ClipboardLine } from "./clipboard-line";

export function ClipboardText() {
  const { clipboardText } = useStore(clipboardStore);

  return (
    <ul className="flex w-full flex-col gap-4">
      {clipboardText.map((line) => (
        <ClipboardLine key={line.id} line={line} />
      ))}
    </ul>
  );
}
