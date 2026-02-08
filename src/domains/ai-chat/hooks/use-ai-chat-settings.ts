import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAiChatSettings,
  updateAiChatSettings,
} from "@/domains/ai-chat/functions/settings";
import { AI_CHAT_SETTINGS_KEY } from "@/domains/ai-chat/lib/query-keys";
import type { AiChatSettingsInsertType } from "@/domains/shared/server/db/schema/settings";

export const aiChatSettingsQueryOptions = queryOptions({
  queryKey: [AI_CHAT_SETTINGS_KEY],
  queryFn: () => getAiChatSettings(),
  staleTime: Number.POSITIVE_INFINITY,
});

export function useAiChatSettings() {
  const queryClient = useQueryClient();
  const { data: settings } = useSuspenseQuery(aiChatSettingsQueryOptions);

  const updateSettings = useMutation({
    mutationFn: async (newSettings: AiChatSettingsInsertType) => {
      await updateAiChatSettings({ data: newSettings });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [AI_CHAT_SETTINGS_KEY] });
    },
  });

  return {
    settings,
    updateSettings,
    isLoading: updateSettings.isPending,
  };
}
