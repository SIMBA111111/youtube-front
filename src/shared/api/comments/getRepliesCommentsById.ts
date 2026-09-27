import { ICommentEntity, ICommentFullInfo } from "@/entities/comments/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";
import { IMapCommentStatistic } from "./getCommentsByVideoId";

export interface IGetRepliesCommentsByIdResponse {
  comments: ICommentFullInfo[]
  commentsStatistic: IMapCommentStatistic | null
  commentsCount: number
}


export const getRepliesCommentsById = async (
  parentCommentId: string,
  userId: string = '',
  videoId: string
): Promise<ApiResponse<IGetRepliesCommentsByIdResponse> | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/replies-comments/${parentCommentId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, videoId }),
      }
    );

    if (res.status === 200) {
      return await res.json();
    } else {
      return null
    }
  } catch (error) {
    console.log(`Error getRepliesCommentsById: ${error}`);
    return null
  }
};
