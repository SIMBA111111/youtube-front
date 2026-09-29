import { IPlaylistEntity } from "@/entities/playlist/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";

export const getLikedPlaylists = async (
    userId: string,
    jwt: string,
    offset: number = 0,
    limit: number = 20
): Promise<ApiResponse<IPlaylistEntity[]> | null> => {
    try {
        const params = new URLSearchParams({
            offset: String(offset),
            limit: String(limit),
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me/my-liked-playlists/${userId}?${params}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            }
        );

        if (res.status === 200) {
            return await res.json()
        }

        return null;
    } catch (error) {
        throw new Error(`Error getLikedPlaylists: ${error}`);
    }
};