import { ApiResponseDTO } from "@/shared/types/apiResponse"

export const updateNotifView = async (
    notifId: string
): Promise<ApiResponseDTO<boolean | null>> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-notif-view/${notifId}`, {
                method: 'PATCH'
            })

        if (res.status === 200) {
            return await res.json()
        }

        return new ApiResponseDTO<boolean | null>(null)
    } catch (error) {
        console.error(`Error getNotifs: ${error}`)
        return new ApiResponseDTO<boolean | null>(null)
    }
}