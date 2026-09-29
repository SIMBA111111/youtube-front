import { IPlaylistEntity } from "@/entities/playlist/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";


export const getMyLikedPlaylists = async (
    jwt: string,
    meId: string,
    offset: number,
    limit: number
): Promise<ApiResponse<IPlaylistEntity[]> | null> => {
    try {
        const params = new URLSearchParams({
            offset: String(offset),
            limit: String(limit),
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-liked-playlists/${meId}?${params}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                },
            }
        );

        if (res.status === 200) {
            return await res.json();
        }

        return null;
    } catch (error) {
        throw new Error(`Error getMyLikedPlaylists: ${error}`);
    }
};