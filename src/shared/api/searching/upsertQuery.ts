import { ISearchingEntity } from "@/entities/searching/types";
import { ApiResponse, ApiResponseDTO } from "@/shared/types/apiResponse";

export const upsertQuery = async (query: string): Promise<ApiResponse<ISearchingEntity | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search-upsert-query`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        })

        if (res.status === 200) {
            return await res.json()
        }

        return new ApiResponseDTO(null)
    } catch (error) {
        console.log(`Error createQuery: ${error}`);
        return new ApiResponseDTO(null)
    }
}