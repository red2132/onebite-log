import { createPost } from "@/api/post";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";
export function useCreatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
