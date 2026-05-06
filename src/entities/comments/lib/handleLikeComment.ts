import { updateEvaluateComment } from "@/shared/api/comments/updateEvaluateComment";
import { Dispatch, SetStateAction } from "react";

export const handleLikeComment = async (
    isLiked: boolean, 
    userId: string, 
    commentId: string, 
    setLikesCount: Dispatch<SetStateAction<number>>,
    setIsLiked: (value: boolean) => void
) => {
    try {   
        const res = await updateEvaluateComment({isLiked: !isLiked, isDisliked: false, userId, commentId})
        if(res.success) {
            setLikesCount(res.comment.like_count)
            setIsLiked(res.stats.liked)
        }
    } catch (error) {
        console.log('Error handleLikeComment');
    }
} 