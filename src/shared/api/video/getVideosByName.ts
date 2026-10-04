import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types"
import { ApiResponse, ApiResponseDTO } from "@/shared/types/apiResponse"

interface IGetVideosByName {
    videoName: string
    offset: number
    limit: number
}

export const getVideosByName = async ({
    videoName,
    offset,
    limit, 
}: IGetVideosByName
): Promise<ApiResponse<IVideoFullInfo[] | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos/by-name/${videoName}?offset=${offset}&limit=${limit}`)

        if (res.status === 200)
            return await res.json()

        return new ApiResponseDTO(null)
    
    } catch (error) {
        new Error(`Error getVideosByName: ${error}`);
        return new ApiResponseDTO(null)
    }
}   