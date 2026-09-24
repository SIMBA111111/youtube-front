import { ICommentEntity } from "@/entities/comments/model/types"
import { ApiResponse } from "@/shared/types/apiResponse";
import { ICommentStatisticEntity } from "@/shared/types/commentStatisticEntity"


interface IUpdateEvaluateCommentDto {
  isLiked: boolean;
  isDisliked: boolean;
  userId: string;
  commentId: string;
  videoId: string;
}

export interface IMarkCommentResponse {
  updatedComment: ICommentEntity;
  updatedStatistic: ICommentStatisticEntity;
}

export const updateEvaluateComment = async ({
  isLiked,
  isDisliked,
  userId,
  commentId,
  videoId,
}: IUpdateEvaluateCommentDto): Promise<ApiResponse<IMarkCommentResponse> | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/mark/${commentId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, userId, isLiked, isDisliked }),
        credentials: 'include',
      }
    );

    if (!res.ok) {
      console.error(
        `updateEvaluateComment failed: ${res.status} ${res.statusText}`
      );
      return null;
    }

    return (await res.json());
  } catch (error) {
    console.error(`Error updateEvaluateComment: ${error}`);
    return null;
  }
};