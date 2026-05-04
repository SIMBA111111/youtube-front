import { updateEvaluateVideo } from "@/shared/api/video/updateEvaluateVideo"
import { IMyMark, IVideosMarks } from "../ui";

export const handleLikeVideo = async (
    userId: string, 
    videoId: string, 
    isLiked: boolean,
    setMyMark: (value: IMyMark) => void,
    setVideoMarks: (value: IVideosMarks) => void
) => {
    const res = await updateEvaluateVideo({isLiked: !isLiked, isDisliked: false, userId: userId, videoId: videoId})
    if(res.success) {
        console.log('лайкаем данные');
        
        setMyMark({isLiked: res.stats.liked, isDisliked: res.stats.disliked}) 
        setVideoMarks({likeCount: res.video.likeCount, dislikeCount: res.video.dislikeCount}) 
    }

    console.log(res);
}


export const handleDislikeVideo = async (
    userId: string, 
    videoId: string, 
    isDisliked: boolean,
    setMyMark: (value: IMyMark) => void,
    setVideoMarks: (value: IVideosMarks) => void
) => {
    const res = await updateEvaluateVideo({isLiked: false, isDisliked: !isDisliked, userId: userId, videoId: videoId})
    if(res.success) {
        console.log('дизлайкаем видео');
        
        setMyMark({isLiked: res.stats.liked, isDisliked: res.stats.disliked}) 
        setVideoMarks({likeCount: res.video.likeCount, dislikeCount: res.video.dislikeCount}) 
    }

    console.log(res);
}