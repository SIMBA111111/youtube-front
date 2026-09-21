import { IChannelEntity } from "@/entities/channels/model/types"
import { IVideoEntity } from "@/entities/thumbnailVideo/model/types"
import { IFragmentEntity } from "@/shared/types/fragmentEntity"
import { ISubscriptionEntity } from "@/shared/types/subscriptionEntity"
import { IVideoStatisticEntity } from "@/shared/types/videoStatisticEntity"


export interface IGetVideoById {
    video: IVideoEntity
    videoFragments: IFragmentEntity[],
    videoOwnerChannel: IChannelEntity,
    subscriptionData: ISubscriptionEntity | null,
    videoStatData: IVideoStatisticEntity | null,
}

export const getVideoById = async (
  videoId: string,
  channelId?: string
): Promise<IGetVideoById | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video/${videoId}?channelId=${channelId}`
    );

    const data = await res.json();
    
    if (data.success) {
        return data.data
    }
    
    return null
  } catch (error) {
    console.log(`Error getVideoById: ${error}`)
    return null
  }
};