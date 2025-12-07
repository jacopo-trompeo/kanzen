import Dexie from "dexie";
import type { TextHookerDB } from "../types";

export const textHookerDb = new Dexie("TextHookerDB") as Dexie & TextHookerDB;

textHookerDb.version(1).stores({
  lines: "++id, text",
});

export async function getAllLines() {
  return await textHookerDb.lines.toArray();
}

export async function addLine(text: string) {
  return await textHookerDb.lines.add({ text });
}

export async function deleteLine(id: number) {
  return await textHookerDb.lines.delete(id);
}

export async function clearAllLines() {
  return await textHookerDb.lines.clear();
}
