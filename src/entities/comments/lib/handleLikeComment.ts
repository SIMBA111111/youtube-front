import { updateEvaluateComment } from "@/shared/api/comments/updateEvaluateComment";
import { Dispatch, SetStateAction } from "react";

export const handleLikeComment = async (
    isLiked: boolean, 
    userId: string, 
    commentId: string, 
    setLikesCount: Dispatch<SetStateAction<number>>,
    setDislikesCount: Dispatch<SetStateAction<number>>,
    setIsLiked: (value: boolean) => void,
    setIsDisliked: (value: boolean) => void,
) => {
    try {   
        const res = await updateEvaluateComment({isLiked: !isLiked, isDisliked: false, userId, commentId})
        if(res.success) {
            setLikesCount(res.comment.like_count)
            setDislikesCount(res.comment.dislike_count)
            setIsLiked(res.stats.liked)
            setIsDisliked(res.stats.disliked)
        }
    } catch (error) {
        console.log('Error handleLikeComment');
    }
} 