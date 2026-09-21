import { updateEvaluateVideo } from "@/shared/api/video/updateEvaluateVideo"
import { IMyMark, IVideosMarks, TOpenedPopover } from "../ui";

export const handleLikeVideo = async (
    userId: string, 
    videoId: string, 
    isLiked: boolean,
    setMyMark: (value: IMyMark) => void,
    setVideoMarks: (value: IVideosMarks) => void,
    setIsOpenedUnauthPopover: (newValue: TOpenedPopover) => void
) => {
    if (!userId) {
        setIsOpenedUnauthPopover('like')
    }

    const res = await updateEvaluateVideo({isLiked: !isLiked, isDisliked: false, userId: userId, videoId: videoId})
    if(res && res.success && res?.data) {
        setMyMark({isLiked: res.data.stats.liked, isDisliked: res.data.stats.disliked}) 
        setVideoMarks({likeCount: res.data.video.likesCount, dislikeCount: res.data.video.dislikesCount}) 
    }
}


export const handleDislikeVideo = async (
    userId: string, 
    videoId: string, 
    isDisliked: boolean,
    setMyMark: (value: IMyMark) => void,
    setVideoMarks: (value: IVideosMarks) => void,
    setIsOpenedUnauthPopover: (newValue: TOpenedPopover) => void
) => {
    if (!userId) {
        setIsOpenedUnauthPopover('dislike')
    }

    const res = await updateEvaluateVideo({isLiked: false, isDisliked: !isDisliked, userId: userId, videoId: videoId})
    if(res && res.success && res?.data) {
        setMyMark({isLiked: res.data.stats.liked, isDisliked: res.data.stats.disliked}) 
        setVideoMarks({likeCount: res.data.video.likesCount, dislikeCount: res.data.video.dislikesCount}) 
    }
}