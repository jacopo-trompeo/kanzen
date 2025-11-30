import { useCallback, useEffect, useState } from "react";
import { setToLocalStorage } from "@/domains/shared/functions/local-storage";
import type { Line } from "@/domains/text-hooker/types";
import { STORAGE_KEY } from "@/domains/text-hooker/types/constants";

export function useClipboardText(storedLines: Line[]) {
  const [lines, setLines] = useState(storedLines);

  const handleMutation = useCallback((mutationsList: MutationRecord[]) => {
    let text: string | null = null;

    for (const mutation of mutationsList) {
      if (
        mutation.target !== document.body ||
        mutation.type !== "childList" ||
        mutation.addedNodes.length === 0
      ) {
        continue;
      }

      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;

        const element = node as Element;
        if (element.tagName !== "P") continue;

        text = element.textContent.trim();
        element.remove();
      }
    }

    if (!text) return;

    setLines((prevLines) => {
      const newLine = {
        id: crypto.randomUUID(),
        text,
      };

      const newState = [...prevLines, newLine];

      setToLocalStorage(STORAGE_KEY, newState);
      return newState;
    });
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(handleMutation);
    const observerOptions = { childList: true, attributes: false };
    observer.observe(document.body, observerOptions);

    return () => {
      observer.disconnect();
    };
  }, [handleMutation]);

  return lines;
}
