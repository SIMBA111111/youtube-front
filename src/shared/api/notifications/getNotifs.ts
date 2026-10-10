import { ApiResponseDTO } from "@/shared/types/apiResponse"

export interface INotifExtendInfo {
    id: string
    viewed: boolean
    channelId: string
    videoId: string
    notifTypeId: string
    createdDate: string
    updatedDate: string
    videoName: string
    isShort: boolean
    thumbnailUrl: string
    channelName: string
    avatarUrl: string
}

export const getNotifs = async (
    userId: string,
    offset: number,
    limit: number
): Promise<ApiResponseDTO<INotifExtendInfo[] | null>> => {
    try {
        const params = new URLSearchParams({
            offset: String(offset),
            limit: String(limit),
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-notifs/${userId}?${params}`,
            { credentials: "include" }
        )

        if (res.status === 200) {
            return await res.json()
        }

        return new ApiResponseDTO<INotifExtendInfo[] | null>(null)
    } catch (error) {
        console.error(`Error getNotifs: ${error}`)
        return new ApiResponseDTO<INotifExtendInfo[] | null>(null)
    }
}