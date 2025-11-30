import type { Line } from "@/domains/text-hooker/types";

interface ClipboardTextProps {
  lines: Line[];
}

export function ClipboardText(props: ClipboardTextProps) {
  const { lines } = props;

  return lines.map((line) => {
    if (!line.id || !line.text) return null;

    return (
      <div key={line.id}>
        <span>{line.text}</span>
      </div>
    );
  });
}
