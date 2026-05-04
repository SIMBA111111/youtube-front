'use client'

import { Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { handleDislikeVideo, handleEvaluateVideo, handleLikeVideo } from "../lib/handlers"
import styles from './styles.module.scss'
import { useState } from "react"

interface IEvaluateVideo {
    isLiked: boolean,
    isDisliked: boolean,
    likeCount: number
    dislikeCount: number
    userId: string
    videoId: string
}

export interface IMyMark {
    isLiked: boolean;
    isDisliked: boolean;
}

export interface IVideosMarks {
    likeCount: number;
    dislikeCount: number;
}

export const EvaluateVideo: React.FC<IEvaluateVideo> = ({
    isLiked, 
    isDisliked,
    likeCount,
    dislikeCount,
    userId,
    videoId,
}) => {
    const [myMark, setMyMark] = useState<IMyMark>({
        isLiked: isLiked,
        isDisliked: isDisliked
    })

    const [videosMarks, setVideoMarks] = useState<IVideosMarks>({
        likeCount: likeCount,
        dislikeCount: dislikeCount
    })

    return (
        <div className={styles.rating_likeDislike}>
            <div className={styles.rating_like} onClick={() => handleLikeVideo(userId, videoId, myMark.isLiked, setMyMark, setVideoMarks)}>
                <Svg name={myMark.isLiked ? 'filledLike' : 'like'} color="black"/>
                <Text weight={400}>{formatViews(videosMarks.likeCount)}</Text>
            </div>
            <div className={styles.rating_divider}></div>
            <div className={styles.rating_dislike} onClick={() => handleDislikeVideo(userId, videoId, myMark.isDisliked, setMyMark, setVideoMarks)}>
                <Svg name={myMark.isDisliked ? 'filledDislike' : 'dislike'} color="black"/>
                <Text weight={400}>{formatViews(videosMarks.dislikeCount)}</Text>
            </div>
        </div>
    )
}