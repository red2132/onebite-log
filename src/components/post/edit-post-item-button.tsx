import { useOpenEditPostModal } from "@/store/post-editor-modal";
import { Button } from "../ui/button";
import type { PostEntity } from "@/type";

export default function EditPostItemButton(props: PostEntity) {
  const openPostEditorModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openPostEditorModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant={"ghost"}
      onClick={handleButtonClick}
    >
      수정
    </Button>
  );
}
