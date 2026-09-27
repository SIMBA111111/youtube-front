import { ITagEntity } from "@/entities/videoTags/model";
import { ApiResponse } from "@/shared/types/apiResponse";

export const getTags = async (jwt: string | undefined): Promise<ApiResponse<ITagEntity[]> | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tags?isAuth=${!!jwt}`)

        if (res.status === 200) {
            return await res.json()
        }

        return null
    } catch (error) {
        throw new Error(`Error getTags: ${error}`);
    }
}