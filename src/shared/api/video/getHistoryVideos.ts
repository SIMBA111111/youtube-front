import { IVideoEntity, IVideoViewed } from "@/entities/thumbnailVideo/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";

interface IVideoFilter {
    isShort?: boolean | null
    tags?: string
    order?: 'ASC' | 'DESC'
}

export const getHistoryVideos = async (
    userId: string,
    jwt: string,
    filter?: IVideoFilter,
    offset: number = 0,
    limit: number = 20
): Promise<ApiResponse<IVideoViewed[]> | null> => {
    console.log('getHistoryVideos');

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-viewed-history/${userId}/?offset=${offset}&limit=${limit}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({ filter })
            }
        )

        if (res.status === 200) {
            return await res.json()
        }

        return null
    } catch (error) {
        throw new Error(`Error getHistoryVideos: ${error}`);
    }
}