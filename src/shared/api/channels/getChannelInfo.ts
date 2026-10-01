import { IChannelEntity } from "@/entities/channels/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";
import { ISubscriptionEntity } from "@/shared/types/subscriptionEntity";

interface IGetChannelInfoByUsername {
    channelData: IChannelEntity
    subscriptionData: ISubscriptionEntity | null
}

export const getChannelInfoByUsername = async (
    channelId: string,
    userId: string
): Promise<ApiResponse<IGetChannelInfoByUsername> | null> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-info/${channelId}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            }
        );

        if (res.status === 200) {
            return await res.json()
        }

        return null
    } catch (error) {
        throw new Error(`Error getChannelInfo: ${error}`);
    }
};