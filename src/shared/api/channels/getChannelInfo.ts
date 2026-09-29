import { IChannelEntity } from "@/entities/channels/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";

export const getChannelInfoByUsername = async (
    channelId: string,
    userId: string
): Promise<ApiResponse<IChannelEntity>> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-data/${channelId}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            }
        );

        if (res.status === 200) {
            return (await res.json()) as ApiResponse<IChannelEntity>;
        }

        throw new Error(`Unexpected status: ${res.status}`);
    } catch (error) {
        throw new Error(`Error getChannelInfo: ${error}`);
    }
};