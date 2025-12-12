import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseOptimisticUpdateOptions<TData, TParams, TMutationResult> {
  queryKey: string[];
  mutationFn: (params: TParams) => Promise<TMutationResult>;
  updater: (oldData: TData | undefined, params: TParams) => TData | undefined;
  invalidateOnSettled?: boolean;
}

export function useOptimisticUpdate<TData, TParams, TMutationResult>(
  options: UseOptimisticUpdateOptions<TData, TParams, TMutationResult>,
) {
  const { queryKey, mutationFn, updater, invalidateOnSettled = true } = options;
  const queryClient = useQueryClient();

  const optimisticUpdater = useMutation({
    mutationFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, (oldData) => {
        return updater(oldData, newData);
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      if (invalidateOnSettled) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });

  return optimisticUpdater;
}
