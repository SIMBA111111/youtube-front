import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types"
import { ApiResponse } from "@/shared/types/apiResponse"

interface IVideoFilter {
    isShort?: boolean | null
    order?: 'ASC' | 'DESC'
}

export const getLikedVideos = async (
    userId: string, 
    jwt: string, 
    offset: number = 0, 
    limit: number = 20, 
    filter?: IVideoFilter
): Promise<ApiResponse<IVideoFullInfo[]>> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-liked-videos/${userId}/?offset=${offset}&limit=${limit}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
                body: JSON.stringify({ filter }),
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        throw new Error(`Error getLikedVideos: ${error instanceof Error ? error.message : String(error)}`);
    }
};