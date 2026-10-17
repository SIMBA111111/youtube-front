import { ApiResponseDTO } from "@/shared/types/apiResponse"

export const deleteNotif = async (
    notifId: string
): Promise<ApiResponseDTO<boolean | null>> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-notif/${notifId}`, {
                method: 'DELETE'
            })

        if (res.status === 200) {
            return await res.json()
        }

        return new ApiResponseDTO<boolean | null>(null)
    } catch (error) {
        console.error(`Error deleteNotif: ${error}`)
        return new ApiResponseDTO<boolean | null>(null)
    }
}