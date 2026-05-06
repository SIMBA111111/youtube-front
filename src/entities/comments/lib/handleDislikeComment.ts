import { updateEvaluateComment } from "@/shared/api/comments/updateEvaluateComment";
import { Dispatch, SetStateAction } from "react";

export const handleDislikeComment = async (
    isDisliked: boolean, 
    userId: string, 
    commentId: string, 
    setDislikesCount: Dispatch<SetStateAction<number>>,
    setIsDisliked: (value: boolean) => void
) => {
    try {   
        console.log('isDisliked = ', isDisliked);
        
        const res = await updateEvaluateComment({isLiked: false, isDisliked: !isDisliked, userId, commentId})
        if(res.success) {
            setDislikesCount(res.comment.dislike_count)
            setIsDisliked(res.stat.disliked)
        }

    } catch (error) {
        console.log('Error handleDislikeComment');
    }
} 