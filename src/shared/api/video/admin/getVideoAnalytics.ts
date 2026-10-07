import { ApiResponseDTO } from "@/shared/types/apiResponse";

export const getVideoAnalytics = async (
    videoId: string, 
    dateRange: string
): Promise<ApiResponseDTO<Record<string, number> | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video-analytics/${videoId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({dateRange: dateRange})
        })

        if (res.status === 200)
            return await res.json()
        else 
            return new ApiResponseDTO(null)
    } catch (error) {
        new Error(`Error getVideoAnalytics: ${error}`);
        return new ApiResponseDTO(null)
    }
}