import { IChannelEntity } from "@/entities/channels/model/types"
import { IVideoEntity } from "@/entities/thumbnailVideo/model/types"
import { ApiResponse, ApiResponseDTO } from "@/shared/types/apiResponse"
import { IFragmentEntity } from "@/shared/types/fragmentEntity"
import { ISubscriptionEntity } from "@/shared/types/subscriptionEntity"
import { IVideoStatisticEntity } from "@/shared/types/videoStatisticEntity"


export interface IGetVideoById {
    video: IVideoEntity
    videoFragments: IFragmentEntity[],
    channel: IChannelEntity,
    subscriptionData: ISubscriptionEntity | null,
    videoStatData: IVideoStatisticEntity | null,
}

export const getVideoById = async (
  videoId: string,
  channelId?: string | null,
  isShort: boolean | null = null
): Promise<ApiResponse<IGetVideoById | null>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video/${videoId}?channelId=${channelId}&isShort=${isShort}`
    );

    if (res) {
        return await res.json()
    }
    
    return new ApiResponseDTO(null)
  } catch (error) {
    console.log(`Error getVideoById: ${error}`)
    return new ApiResponseDTO(null)
  }
};