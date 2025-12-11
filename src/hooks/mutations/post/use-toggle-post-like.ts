import { togglePostLike } from "@/api/post";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
