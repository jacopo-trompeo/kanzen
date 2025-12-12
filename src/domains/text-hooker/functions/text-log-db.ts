import { createClientOnlyFn } from "@tanstack/react-start";
import { textHookerDb } from "@/domains/text-hooker/lib/db";
import { LOG_MAX_HISTORY } from "@/domains/text-hooker/types/constants";

export const getLogEntries = createClientOnlyFn(async () => {
  return textHookerDb.logEntries.toArray();
});

export const addLogEntry = createClientOnlyFn(async (text: string) => {
  return textHookerDb.transaction("rw", textHookerDb.logEntries, async () => {
    await textHookerDb.logEntries.add({ text });
  });
});

export const deleteLogEntry = createClientOnlyFn(async (id: number) => {
  return textHookerDb.logEntries.delete(id);
});

export const deleteLastEntry = createClientOnlyFn(async () => {
  const lastEntry = await textHookerDb.logEntries.orderBy("id").last();
  if (lastEntry) {
    await textHookerDb.logEntries.delete(lastEntry.id);
  }
});

export const clearLogEntries = createClientOnlyFn(async () => {
  return textHookerDb.logEntries.clear();
});

export const pruneLogEntries = createClientOnlyFn(async () => {
  const count = await textHookerDb.logEntries.count();
  if (count <= LOG_MAX_HISTORY) return;

  await textHookerDb.logEntries
    .orderBy("id")
    .reverse()
    .offset(LOG_MAX_HISTORY)
    .delete();
});
