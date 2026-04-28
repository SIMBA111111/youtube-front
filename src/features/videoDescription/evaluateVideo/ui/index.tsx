'use client'

import { Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { handleEvaluateVideo } from "../lib/handlers"
import styles from './styles.module.scss'

interface IEvaluateVideo {
    isLiked: boolean,
    isDisliked: boolean,
    likeCount: number
    dislikeCount: number
    userId: string
    videoId: string
}

export const EvaluateVideo: React.FC<IEvaluateVideo> = ({
    isLiked, 
    isDisliked,
    likeCount,
    dislikeCount,
    userId,
    videoId
}) => {
    return (
        <div className={styles.rating_likeDislike}>
            <div className={styles.rating_like} onClick={() => handleEvaluateVideo(userId, videoId, isLiked ? false : true, isDisliked)}>
                <Svg name={isLiked ? 'filledLike' : 'like'} color="black"/>
                <Text weight={400}>{formatViews(likeCount)}</Text>
            </div>
            <div className={styles.rating_divider}></div>
            <div className={styles.rating_dislike} onClick={() => handleEvaluateVideo(userId, videoId, isLiked, isDisliked ? false : true)}>
                <Svg name={isDisliked ? 'filledDislike' : 'dislike'} color="black"/>
                <Text weight={400}>{formatViews(dislikeCount)}</Text>
            </div>
        </div>
    )
}