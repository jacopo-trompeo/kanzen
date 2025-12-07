import Dexie from "dexie";
import type { TextHookerDB } from "@/domains/text-hooker/types";

export const textHookerDb = new Dexie("TextHookerDB") as Dexie & TextHookerDB;

textHookerDb.version(1).stores({
  logEntries: "++id, text",
});

export async function getLogEntries() {
  return textHookerDb.logEntries.toArray();
}

export async function addLogEntry(text: string) {
  return textHookerDb.logEntries.add({ text });
}

export async function deleteLogEntry(id: number) {
  return textHookerDb.logEntries.delete(id);
}

export async function clearLogEntries() {
  return textHookerDb.logEntries.clear();
}
