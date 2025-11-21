import { signInWithOAuth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignWithOAuth() {
  return useMutation({
    mutationFn: signInWithOAuth,
  });
}
