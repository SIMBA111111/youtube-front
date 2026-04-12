import { updateEvaluateVideo } from "@/shared/api/video/updateEvaluateVideo"

export const handleEvaluateVideo = async(isDisliked: boolean, isLiked: boolean) => {
    if(isLiked) 
        await updateEvaluateVideo({isLiked: true, isDisliked: false})
    else if(isDisliked)
        await updateEvaluateVideo({isLiked: false, isDisliked: true})
    else
        await updateEvaluateVideo({isLiked: false, isDisliked: false})
}