import { updateEvaluateComment } from "@/shared/api/comments/updateEvaluateComment";
import { Dispatch, SetStateAction } from "react";

export const handleLikeComment = async (
    isLiked: boolean, 
    userId: string, 
    commentId: string, 
    videoId: string, 
    setLikesCount: Dispatch<SetStateAction<number>>,
    setDislikesCount: Dispatch<SetStateAction<number>>,
    setIsLiked: (value: boolean) => void,
    setIsDisliked: (value: boolean) => void,
) => {
    try {   
        const res = await updateEvaluateComment({videoId, isLiked: !isLiked, isDisliked: false, userId, commentId})
        if(res && res.success && res.data) {
            setLikesCount(res.data.updatedComment.likeCount)
            setDislikesCount(res.data.updatedComment.dislikeCount)
            setIsLiked(res.data.updatedStatistic.liked)
            setIsDisliked(res.data.updatedStatistic.disliked)
        }
    } catch (error) {
        console.log('Error handleLikeComment');
    }
} 