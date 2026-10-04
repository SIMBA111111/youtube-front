import { IVideoEntity, IVideoFullInfo } from "@/entities/thumbnailVideo/model/types"
import { ApiResponse } from "@/shared/types/apiResponse"

interface IGetVideoListBySubs {
    meId: string, 
    onlyShorts: boolean, 
    onlyFull: boolean
    offset: number
    limit: number
}

export const getVideoListBySubs = async ({
    meId,
    onlyShorts,
    onlyFull,
    limit,
    offset,
}: IGetVideoListBySubs): Promise<ApiResponse<IVideoFullInfo[]>> => {
    try {
        const params = new URLSearchParams({
            limit: String(limit),
            offset: String(offset),
            onlyShorts: String(onlyShorts),
            onlyFull: String(onlyFull),
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos-my-subs/${meId}?${params}`
        );

        if (res.status === 200) {
            return await res.json()
        }

        throw new Error(`Unexpected status: ${res.status}`);
    } catch (error) {
        throw new Error(`Error getVideoListBySubs: ${error}`);
    }
};