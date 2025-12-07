import type { EntityTable } from "dexie";

export type Line = {
  id?: number;
  text?: string;
};

export interface TextHookerSettingsStore {
  fontSize: number;
  webhookUrl: string;
}

export interface TextHookerDB {
  lines: EntityTable<Line, "id">;
}
