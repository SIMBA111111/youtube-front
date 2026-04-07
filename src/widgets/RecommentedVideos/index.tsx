"use client"

import { useState } from "react"
import { IVideo } from "@/entities/thumbnailVideo/modal/types"
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard"
import styles from "./styles.module.scss"
import { ThumbnailShortVideoCard } from "@/entities"

interface IRecommentedVideos {
    videos: IVideo[]
}

export const RecommentedVideos: React.FC<IRecommentedVideos> = ({ videos }) => {
    
    return (
        <div className={styles.container}>
            {videos.map((video: IVideo) => {
                return  video.isShort ?
                    <div key={video.id} className={styles.shortVideoCardWrapper}>
                        <ThumbnailShortVideoCard key={video.id} {...video} isRow/>
                    </div>
                :
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard key={video.id} video={video} isRow/>
                    </div>
            })}
        </div>
    )
}