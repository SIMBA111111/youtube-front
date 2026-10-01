import { IPlaylistEntity } from "@/entities/playlist/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";

export const getPlaylistsByUsername = async (
    channelUsername: string,
    limit: number = 20,
    offset: number = 0
): Promise<ApiResponse<IPlaylistEntity[]> | null> => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playlists/by-username/${encodeURIComponent(channelUsername)}?limit=${limit}&offset=${offset}`
        );

        if (res.status === 200) {
            return await res.json();
        }

        return null;
    } catch (error) {
        console.error(`Error getPlaylistsByUsername: ${error}`);
        return null;
    }
};