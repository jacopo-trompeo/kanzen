import { useLiveQuery } from "dexie-react-hooks";
import { getAllLines } from "@/domains/text-hooker/stores/db";
import { ClipboardLine } from "./clipboard-line";

export function ClipboardText() {
  const lines = useLiveQuery(() => getAllLines(), []) ?? [];

  return (
    <ul className="flex w-full flex-col gap-4">
      {lines.map((line) => (
        <ClipboardLine key={line.id} line={line} />
      ))}
    </ul>
  );
}
