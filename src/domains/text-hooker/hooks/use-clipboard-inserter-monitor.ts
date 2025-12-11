import { useCallback, useEffect, useRef } from "react";
import { useWebSocketContext } from "@/domains/text-hooker/context/websocket-context";
import { addLogEntry } from "@/domains/text-hooker/functions/text-log-db";

export function useClipboardInserterMonitor() {
  const { status } = useWebSocketContext();
  const observerRef = useRef<MutationObserver | null>(null);

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
    if (status === "CONNECTED") {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    const observer = new MutationObserver(handleMutation);
    const observerOptions = { childList: true, attributes: false };
    observer.observe(document.body, observerOptions);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [handleMutation, status]);
}
