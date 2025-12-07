import { useLiveQuery } from "dexie-react-hooks";
import { getLogEntries } from "@/domains/text-hooker/lib/db";

export function useTextLog() {
  return useLiveQuery(() => getLogEntries(), []) ?? [];
}
