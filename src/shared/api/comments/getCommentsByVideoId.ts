import { ICommentFullInfo } from "@/entities/comments/model/types"
import { ApiResponse } from "@/shared/types/apiResponse";
import { ICommentStatisticEntity } from "@/shared/types/commentStatisticEntity";


export type IMapCommentStatistic = Record<string, ICommentStatisticEntity>;

export interface IGetCommentsByVideoId {
    comments: ICommentFullInfo[]
    commentsStatistic: IMapCommentStatistic | null
    commentsCount: number
}

export const getCommentsByVideoId = async (
    videoId: string, offset: number, limit: number, filter: string, userId: string, parentCommentId: string = ''
): Promise<ApiResponse<IGetCommentsByVideoId> | string> => {
    console.log('getCommentsByVideoId');
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comments/${videoId}?offset=${offset}&limit=${limit}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({parentCommentId, filter, userId})
        })

        if (res && res.status === 200) {
            return await res.json()
        } else {
            console.error('getCommentsByVideoId non 200 status');
            return 'getCommentsByVideoId non 200 status'
        }
    } catch (error) {
        new Error(`Error getCommentsByVideoId: ${error}`);
        return `Error getCommentsByVideoId: ${error}`
    }
}