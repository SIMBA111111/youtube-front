import { ApiResponse, ApiResponseDTO } from "@/shared/types/apiResponse";

export const deleteComment = async (commentId: string, videoId: string): Promise<ApiResponse<boolean | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/delete/${commentId}?videoId=${videoId}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (res.status === 200)
            return await res.json()

        return new ApiResponseDTO(null)
    } catch (error) {
        console.log(`Error deleteComment: ${error}`);
        return new ApiResponseDTO(null)
    }
}


export const attachComment = async (commentId: string, videoId: string): Promise<ApiResponse<boolean | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/attach/${commentId}?videoId=${videoId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (res.status === 200)
            return await res.json()

        return new ApiResponseDTO(null)
    } catch (error) {
        console.log(`Error attachComment: ${error}`);
        return new ApiResponseDTO(null)
    }
}
