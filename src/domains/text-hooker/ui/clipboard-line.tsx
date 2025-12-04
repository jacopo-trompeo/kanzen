import { useState } from "react";
import type { Line } from "@/domains/text-hooker/types";
import { DeleteLineButton } from "./delete-line-button";

interface ClipboardLineProps {
  line: Line;
}

export function ClipboardLine(props: ClipboardLineProps) {
  const { line } = props;
  const [hoveredLine, setHoveredLine] = useState<string>();
  const showDelete = hoveredLine === line.id;

  return (
    <li
      className="flex items-center gap-3"
      onMouseEnter={() => setHoveredLine(line.id)}
      onMouseLeave={() => setHoveredLine(undefined)}
    >
      <span className="max-w-[120ch]">{line.text}</span>
      {showDelete && <DeleteLineButton lineId={line.id} />}
    </li>
  );
}
