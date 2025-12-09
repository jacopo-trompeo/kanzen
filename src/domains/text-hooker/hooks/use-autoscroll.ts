import { useEffect, useLayoutEffect, useRef } from "react";
import type { LogEntry } from "@/domains/text-hooker/types";
import {
  AUTOSCROLL_PX_LEEWAY,
  PRUNE_PX_THRESHOLD,
} from "@/domains/text-hooker/types/constants";

export function useAutoscroll(textLog: LogEntry[], onAtBottom: () => void) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousLogLengthRef = useRef(textLog.length);
  const isNearBottomRef = useRef(true);
  const onAtBottomRef = useRef(onAtBottom);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;
      isNearBottomRef.current = distanceToBottom <= AUTOSCROLL_PX_LEEWAY;

      if (distanceToBottom < PRUNE_PX_THRESHOLD) {
        onAtBottomRef.current();
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const wasNewMessageAdded = textLog.length > previousLogLengthRef.current;

    if (wasNewMessageAdded && isNearBottomRef.current) {
      container.scrollTop = container.scrollHeight;
    }

    previousLogLengthRef.current = textLog.length;
  }, [textLog.length]);

  return scrollContainerRef;
}
