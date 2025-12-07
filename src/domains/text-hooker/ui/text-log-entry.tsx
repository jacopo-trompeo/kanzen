import { useStore } from "@tanstack/react-store";
import { useState } from "react";
import { textHookerSettingsStore } from "@/domains/text-hooker/stores/settings";
import type { LogEntry } from "@/domains/text-hooker/types";
import { DeleteEntryButton } from "./delete-entry-button";

interface TextLogEntryProps {
  logEntry: LogEntry;
}

export function TextLogEntry(props: TextLogEntryProps) {
  const { logEntry } = props;
  const { fontSize } = useStore(textHookerSettingsStore);
  const [hoveredEntry, setHoveredEntry] = useState<number>();
  const showDelete = hoveredEntry === logEntry.id;

  return (
    <li
      className="flex items-center gap-3"
      onMouseEnter={() => setHoveredEntry(logEntry.id)}
      onMouseLeave={() => setHoveredEntry(undefined)}
    >
      <span
        className="max-w-[120ch]"
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {logEntry.text}
      </span>
      {showDelete && <DeleteEntryButton entryId={logEntry.id} />}
    </li>
  );
}
