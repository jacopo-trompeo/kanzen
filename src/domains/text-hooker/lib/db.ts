import Dexie from "dexie";
import type { TextHookerDB } from "@/domains/text-hooker/types";

export const textHookerDb = new Dexie("TextHookerDB") as Dexie & TextHookerDB;

textHookerDb.version(1).stores({
  logEntries: "++id, text",
});
