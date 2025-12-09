import { useAutoscroll } from "@/domains/shared/hooks/use-autoscroll";
import { pruneLogEntries } from "@/domains/text-hooker/functions/text-log-db";
import { useTextLog } from "@/domains/text-hooker/hooks/use-text-log";
import { TextLogEntry } from "./text-log-entry";

export function TextLogList() {
  const textLog = useTextLog();
  const scrollContainerRef = useAutoscroll(textLog, {
    onAtBottom: pruneLogEntries,
  });

  return (
    <div
      ref={scrollContainerRef}
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
