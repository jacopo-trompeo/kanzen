import type { EntityTable } from "dexie";

export interface TextHookerSettingsStore {
  fontSize: number;
  webhookUrl: string;
}

export type LogEntry = {
  id: number;
  text: string;
};

export interface TextHookerDB {
  logEntries: EntityTable<LogEntry, "id">;
}
