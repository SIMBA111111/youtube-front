import { ApiResponse, ApiResponseDTO } from "@/shared/types/apiResponse";
import { IGetChannelInfoByUsername } from "./getChannelInfo";
import { IChannelEntity } from "@/entities/channels/model/types";
import { ISubscriptionEntity } from "@/shared/types/subscriptionEntity";

export interface IGetChannelInfoById {
    channel: IChannelEntity
    subscriptionData: ISubscriptionEntity | null
}

export const getChannelInfoById = async (
    channelId: string
): Promise<ApiResponse<IGetChannelInfoById | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-data/${channelId}`)

        if (res.status === 200) {
            const data = await res.json()
            console.log('data:', data);
            return data
        } else {
            return new ApiResponseDTO(null)
        }
    } catch (error) {
        new Error(`Error getChannelInfo: ${error}`);
        return new ApiResponseDTO(null)
    }
}