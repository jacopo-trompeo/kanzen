import { useState } from "react";
import { useTextHookerSettings } from "@/domains/text-hooker/hooks/use-text-hooker-settings";
import type { LogEntry } from "@/domains/text-hooker/types";
import { DeleteEntryButton } from "./delete-entry-button";

interface TextLogEntryProps {
  logEntry: LogEntry;
}

export function TextLogEntry(props: TextLogEntryProps) {
  const { logEntry } = props;
  const { fontSize } = useTextHookerSettings();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: `${fontSize}px` }}>{logEntry.text}</span>
      {isHovered && <DeleteEntryButton entryId={logEntry.id} />}
    </li>
  );
}
