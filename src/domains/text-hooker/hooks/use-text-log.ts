import { useLiveQuery } from "dexie-react-hooks";
import { getLogEntries } from "@/domains/text-hooker/functions/text-log-db";

export function useTextLog() {
  return useLiveQuery(() => getLogEntries(), []) ?? [];
}
