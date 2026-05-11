import type { RefObject } from "react";
import { createReplyComment } from "@/shared/api/comments/createReplyComment";

export const handleReplayComment = async (
  value: string | undefined,
  videoId: string,
  userId: string,
  parentCommentId: string,
  setIsOpenedReplayInput: (v: boolean) => void,
  inputRef: RefObject<HTMLInputElement | null>
) => {
  if (value) {
    const res = await createReplyComment(
      value,
      videoId,
      userId,
      parentCommentId
    );
    setIsOpenedReplayInput(false);
    if (inputRef.current) inputRef.current.value = "";
  }
};
