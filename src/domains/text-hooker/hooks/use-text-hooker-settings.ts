import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getTextHookerSettings,
  updateTextHookerSettings,
} from "@/domains/text-hooker/functions/settings";

const QUERY_KEY = ["text-hooker-settings"];
type Settings = Awaited<ReturnType<typeof getTextHookerSettings>>;

export const settingsQueryOptions = queryOptions({
  queryKey: QUERY_KEY,
  queryFn: () => getTextHookerSettings(),
  staleTime: Number.POSITIVE_INFINITY,
});

export function useTextHookerSettings() {
  const queryClient = useQueryClient();
  const { data: settings } = useSuspenseQuery(settingsQueryOptions);

  const updateSettings = useMutation({
    mutationFn: updateTextHookerSettings,
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previousSettings = queryClient.getQueryData(QUERY_KEY);

      queryClient.setQueryData<Settings>(QUERY_KEY, (old) => {
        if (!old) return old;
        return {
          ...old,
          ...newSettings,
        };
      });

      return { previousSettings };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousSettings);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return { settings, updateSettings };
}
