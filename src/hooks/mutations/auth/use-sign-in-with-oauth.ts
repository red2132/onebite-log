import { signInWithOAuth } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export function useSignWithOAuth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      console.error(error);
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
