import { deleteImagesInPath } from "@/api/images";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallback } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      // 삭제 후, 피드 리페칭
      queryClient.resetQueries({ queryKey: QUERY_KEYS.post.list });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
