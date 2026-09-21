import { IVideoEntity } from "@/entities/thumbnailVideo/model/types"
import { ApiResponse } from "@/shared/types/apiResponse"
import { IVideoStatisticEntity } from "@/shared/types/videoStatisticEntity"

interface IUpdateEvaluateVideo {
  isLiked: boolean;
  isDisliked: boolean;
  userId: string;
  videoId: string;
}

interface IResponseUpdateEvaluateVideo {
  stats: IVideoStatisticEntity;
  video: IVideoEntity;
}

export const updateEvaluateVideo = async ({
  isLiked,
  isDisliked,
  userId,
  videoId,
}: IUpdateEvaluateVideo): Promise<ApiResponse<IResponseUpdateEvaluateVideo> | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mark/video/${videoId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isLiked, isDisliked }),
        credentials: 'include',
      }
    );

    if (res.ok) {
      return await res.json();
    }

    return null;
  } catch (error) {
    console.error(`Error updateEvaluateVideo: ${error}`);
    return null;
  }
};