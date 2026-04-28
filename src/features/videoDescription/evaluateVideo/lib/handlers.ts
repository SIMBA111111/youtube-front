import { updateEvaluateVideo } from "@/shared/api/video/updateEvaluateVideo"

export const handleEvaluateVideo = async (userId: string, videoId: string, isDisliked: boolean, isLiked: boolean) => {
    console.log('handleEvaluateVideo');
    
    console.log('isLiked = ', isLiked);
    console.log('isDisliked = ', isDisliked);
    
    
    if(isLiked) 
        await updateEvaluateVideo({isLiked: true, isDisliked: false, userId: userId, videoId: videoId})
    else if(isDisliked)
        await updateEvaluateVideo({isLiked: false, isDisliked: true, userId: userId, videoId: videoId})
    else
        await updateEvaluateVideo({isLiked: false, isDisliked: false, userId: userId, videoId: videoId})
}