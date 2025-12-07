import { useTextLog } from "@/domains/text-hooker/hooks/use-text-log";
import { TextLogEntry } from "./text-log-entry";

export function TextLogList() {
  const textLog = useTextLog();

  return (
    <ul className="flex w-full flex-col gap-4">
      {textLog.map((logEntry) => (
        <TextLogEntry key={logEntry.id} logEntry={logEntry} />
      ))}
    </ul>
  );
}
