import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types"
import { FiltersEnum } from "@/features/ChannelVideoList/ui"
import { ApiResponse } from "@/shared/types/apiResponse"


export const getVideoListByChannelUsername = async (
    channelUsername: string,
    isShort: boolean,
    filter: keyof typeof FiltersEnum = 'NEWS',
    limit: number = 20,
    offset: number = 0
): Promise<ApiResponse<IVideoFullInfo[]> | null> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-videos/${channelUsername}?limit=${limit}&offset=${offset}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filter, isShort }),
            }
        );

        if (res.status === 200) {
            const videos = await res.json();
            console.log('videos: ', videos);
            
            return videos
        }

        return null;
    } catch (error) {
        console.error(`Error getVideoListByChannelUsername: ${error}`);
        return null;
    }
};