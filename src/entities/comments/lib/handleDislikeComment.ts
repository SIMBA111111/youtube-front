import { updateEvaluateComment } from "@/shared/api/comments/updateEvaluateComment";
import { Dispatch, SetStateAction } from "react";

export const handleDislikeComment = async (
  isDisliked: boolean,
  userId: string,
  commentId: string,
  videoId: string,
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
      videoId
    });

    if (res && res.success && res.data) {
      setDislikesCount(res.data.updatedComment.dislikeCount);
      setLikesCount(res.data.updatedComment.likeCount);
      setIsDisliked(res.data.updatedStatistic.disliked);
      setIsLiked(res.data.updatedStatistic.liked);
    }
  } catch (error) {
    console.log("Error handleDislikeComment = ", error);
  }
};
