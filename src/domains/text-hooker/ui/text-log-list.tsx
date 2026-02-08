import { useAutoscroll } from "@/domains/shared/hooks/use-autoscroll";
import { pruneLogEntries } from "@/domains/text-hooker/functions/text-log-db";
import { useTextHookerSettings } from "@/domains/text-hooker/hooks/use-text-hooker-settings";
import { useTextLog } from "@/domains/text-hooker/hooks/use-text-log";
import { TextLogEntry } from "./text-log-entry";

export function TextLogList() {
  const { settings } = useTextHookerSettings();
  const textLog = useTextLog();
  const { scrollContainerRef } = useAutoscroll({
    onAtBottom: pruneLogEntries,
  });

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto pr-[10%] pb-[20%] [overflow-anchor:auto]"
    >
      <ul className="flex w-full flex-col gap-4" aria-live="polite">
        {textLog.map((logEntry) => (
          <TextLogEntry
            key={logEntry.id}
            logEntry={logEntry}
            fontSize={settings?.fontSize}
          />
        ))}
      </ul>
    </div>
  );
}
