import { useLayoutEffect, useRef } from "react";
import { useTextLog } from "@/domains/text-hooker/hooks/use-text-log";
import { TextLogEntry } from "./text-log-entry";

export function TextLogList() {
  const textLog = useTextLog();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const previousLogLengthRef = useRef(0);

  function onScroll() {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    const LEEWAY = 300;
    isNearBottomRef.current = distanceToBottom <= LEEWAY;
  }

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const wasNewMessageAdded = textLog.length > previousLogLengthRef.current;

    if (wasNewMessageAdded && isNearBottomRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "instant",
      });
    }

    previousLogLengthRef.current = textLog.length;
  }, [textLog.length]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={onScroll}
      className="h-screen w-full overflow-y-auto pr-[10%] pb-[20%] [overflow-anchor:auto]"
    >
      <ul className="flex w-full flex-col gap-4">
        {textLog.map((logEntry) => (
          <TextLogEntry key={logEntry.id} logEntry={logEntry} />
        ))}
      </ul>
    </div>
  );
}
