import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useOptimisticUpdate } from "@/domains/shared/hooks/use-optimistic-update";
import type {
  TextHookerSettings,
  TextHookerSettingsInsertType,
} from "@/domains/shared/server/db/schema/settings";
import {
  getTextHookerSettings,
  updateTextHookerSettings,
} from "@/domains/text-hooker/functions/settings";

const QUERY_KEY = ["text-hooker-settings"];

export const settingsQueryOptions = queryOptions({
  queryKey: QUERY_KEY,
  queryFn: () => getTextHookerSettings(),
  staleTime: Number.POSITIVE_INFINITY,
});

export function useTextHookerSettings() {
  const { data: settings } = useSuspenseQuery(settingsQueryOptions);

  const updateSettings = useOptimisticUpdate({
    queryKey: QUERY_KEY,
    mutationFn: async (newSettings: TextHookerSettingsInsertType) => {
      await updateTextHookerSettings({ data: newSettings });
    },
    updater: (oldSettings: TextHookerSettings | undefined, newSettings) => {
      if (!oldSettings) return undefined;
      return { ...oldSettings, ...newSettings };
    },
  });

  return { settings, updateSettings };
}
