import { useStore } from "@tanstack/react-store";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/domains/shared/components/ui/button";
import {
  clipboardStore,
  deleteLineFromClipboardStore,
} from "@/domains/text-hooker/stores/clipboard";

export function ClipboardText() {
  const { clipboardText } = useStore(clipboardStore);
  const [showDelete, setShowDelete] = useState<string>();

  return (
    <ul className="flex w-full flex-col gap-4">
      {clipboardText.map((line) => {
        if (!line.id || !line.text) return null;

        return (
          <li
            key={line.id}
            className="flex items-center gap-3"
            onMouseEnter={() => setShowDelete(line.id)}
            onMouseLeave={() => setShowDelete(undefined)}
          >
            <span className="max-w-[120ch]">{line.text}</span>
            {showDelete === line.id ? (
              <Button
                variant="ghost"
                size="icon-xs"
                className="hover:bg-transparent"
                onClick={() => {
                  if (!line.id) return;
                  deleteLineFromClipboardStore(line.id);
                }}
              >
                <X />
              </Button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
