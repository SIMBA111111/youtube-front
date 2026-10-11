import { ApiResponse, ApiResponseDTO } from "@/shared/types/apiResponse";

interface IGetUnviewedNotifsCount {
    count: number
}

export const getUnviewedNotifsCount = async (userId: string): Promise<ApiResponse<IGetUnviewedNotifsCount | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-unviewed-notifs-count/${userId}`)

        if (res.status === 200) {
            return await res.json()
        }

        return new ApiResponseDTO<IGetUnviewedNotifsCount | null>(null)
    } catch (error) {
        console.error(`Error getUnviewedNotifsCount: ${error}`)
        return new ApiResponseDTO<IGetUnviewedNotifsCount | null>(null)
    }
}