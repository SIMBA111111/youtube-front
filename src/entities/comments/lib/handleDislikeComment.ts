import { updateEvaluateComment } from "@/shared/api/comments/updateEvaluateComment";
import { Dispatch, SetStateAction } from "react";

export const handleDislikeComment = async (
  isDisliked: boolean,
  userId: string,
  commentId: string,
  setDislikesCount: Dispatch<SetStateAction<number>>,
  setLikesCount: Dispatch<SetStateAction<number>>,
  setIsDisliked: (value: boolean) => void,
  setIsLiked: (value: boolean) => void
) => {
  try {
    const res = await updateEvaluateComment({
      isLiked: false,
      isDisliked: !isDisliked,
      userId,
      commentId,
    });

    if (res.success) {
      setDislikesCount(res.comment.dislike_count);
      setLikesCount(res.comment.like_count);
      setIsDisliked(res.stats.disliked);
      setIsLiked(res.stats.liked);
    }
  } catch (error) {
    console.log("Error handleDislikeComment = ", error);
  }
};
