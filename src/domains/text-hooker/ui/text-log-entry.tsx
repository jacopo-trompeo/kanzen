import type { LogEntry } from "@/domains/text-hooker/types";
import { DeleteEntryButton } from "./delete-entry-button";

interface TextLogEntryProps {
  logEntry: LogEntry;
  fontSize: number | undefined;
}

export function TextLogEntry(props: TextLogEntryProps) {
  const { logEntry, fontSize } = props;

  return (
    <li className="group">
      <span style={{ fontSize: `${fontSize}px` }}>{logEntry.text}</span>
      <div className="inline-block opacity-0 group-hover:opacity-100 focus-within:opacity-100">
        <DeleteEntryButton entryId={logEntry.id} />
      </div>
    </li>
  );
}
