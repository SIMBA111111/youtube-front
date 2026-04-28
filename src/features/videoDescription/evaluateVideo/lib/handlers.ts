import { updateEvaluateVideo } from "@/shared/api/video/updateEvaluateVideo"

export const handleLikeVideo = async (userId: string, videoId: string, isLiked: boolean) => {
    console.log('handleEvaluateVideo');
    console.log('isLiked === ', isLiked);
    
    await updateEvaluateVideo({isLiked: !isLiked, isDisliked: false, userId: userId, videoId: videoId})
}

export const handleDislikeVideo = async (userId: string, videoId: string, isDisliked: boolean) => {
    console.log('handleEvaluateVideo');

    await updateEvaluateVideo({isLiked: false, isDisliked: !isDisliked, userId: userId, videoId: videoId})
}