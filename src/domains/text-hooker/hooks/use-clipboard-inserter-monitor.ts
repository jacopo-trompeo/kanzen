import { useCallback, useEffect } from "react";
import { addLogEntry } from "@/domains/text-hooker/functions/text-log-db";

interface UseClipboardInserterMonitorOptions {
  disabled: boolean;
}

export function useClipboardInserterMonitor(
  options: UseClipboardInserterMonitorOptions,
) {
  const { disabled } = options;

  const handleMutation = useCallback(
    async (mutationsList: MutationRecord[]) => {
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

          const text = element.textContent.trim();
          element.remove();

          if (!text) continue;
          await addLogEntry(text);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (disabled) return;

    const observer = new MutationObserver(handleMutation);
    const observerOptions = { childList: true, attributes: false };
    observer.observe(document.body, observerOptions);

    return () => {
      observer.disconnect();
    };
  }, [disabled, handleMutation]);
}
