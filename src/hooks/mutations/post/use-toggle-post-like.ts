import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { Post, UseMutationCallback } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      // 요청 실패 시 원복을 위해 이전 데이터 저장
      const prevPost = queryClient.getQueryData<Post>(
        QUERY_KEYS.post.byId(postId),
      );

      // 좋아요 카운트 낙관적 업데이트
      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw new Error("게시물이 존재하지 않습니다");
        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });

      return {
        prevPost,
      };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      // 에러 시 기존 데이터로 원복
      if (context && context.prevPost) {
        queryClient.setQueryData<Post>(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
