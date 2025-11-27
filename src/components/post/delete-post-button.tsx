import { useOpenAlertModal } from "@/store/alert-modal";
import { Button } from "../ui/button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();

  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onError: (error) => {
      toast.error("게시물 삭제에 실패했습니다", {
        position: "top-center",
      });
    },
  });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "게시물 삭제",
      description: "삭제된 게시물은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(id);
      },
    });
  };
  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleDeleteClick}
      disabled={isDeletePostPending}
    >
      삭제
    </Button>
  );
}
