import type { EntityTable } from "dexie";

export type LogEntry = {
  id: number;
  text: string;
};

export interface TextHookerDB {
  logEntries: EntityTable<LogEntry, "id">;
}
