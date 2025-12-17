import CommentItem from "@/components/comment/comment-item";
import { useCommentsData } from "@/hooks/queries/use-comments-data";
import Fallback from "../fallback";
import Loader from "../loader";
import type { Comment, NestedComment } from "@/type";

function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    // 대댓글이 아닌 경우 배열에 댓글 삽입
    if (!comment.root_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      // 대댓글인 경우, 부모 댓글을 찾아 children에 대댓글 삽입
      const rootCommentIndex = result.findIndex(
        (item) => item.id === comment.root_comment_id,
      );

      const parentComment = comments.find(
        (item) => item.id === comment.parent_comment_id,
      );

      if (rootCommentIndex === -1) return;
      if (!parentComment) return;

      result[rootCommentIndex].children.push({
        ...comment,
        children: [],
        parentComment,
      });
    }
  });
  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentsData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentsPending) return <Loader />;

  const nestedComments = toNestedComments(comments);

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
