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
import type { AiChatSettingsInsertType } from "@/domains/shared/server/db/schema/settings";

const QUERY_KEY = ["ai-chat-settings"];

export const aiChatSettingsQueryOptions = queryOptions({
  queryKey: QUERY_KEY,
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return {
    settings,
    updateSettings,
    isLoading: updateSettings.isPending,
  };
}
