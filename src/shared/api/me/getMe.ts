import { IChannelEntity } from "@/entities/channels/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";

const ME = {
    id: 'pldkfpolskf',
    name: 'Name',
    username: 'UserName',
    avatarUrl:'/testImages/pr.png'
}

export const getMe = async (jwt: string, meId: string): Promise<ApiResponse<IChannelEntity> | null> => {
    console.log('meID ========== ', meId);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-data/${meId}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })

        if (res.status === 200) {
            return await res.json()
        }

        return null
    } catch (error) {
        throw new Error(`Error getMe: ${error}`);
    }
}