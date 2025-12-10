import { createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 리페칭을 위한 캐시 데이터 리셋
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
