import { signUp } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      console.error(error);
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
