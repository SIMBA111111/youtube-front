'use client'

import { useState, useEffect } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Svg, Text } from "@/shared/ui";

import styles from "./styles.module.scss";
import { getDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { ThumbnailShortVideoCard } from "@/entities";

interface ITAG {
    id: string
    name: string
}

const getVideosCount = (device: any) => {
    switch (true) {
        case device.isMobile === true:
            return 1
    
        case device.isTablet === true:
            return 2

        default:
            return 3
    }
}

const getShortsCount = (device: any) => {
    switch (true) {
        case device.isMobile === true:
            return 2

        case device.isTablet === true:
            return 3
    
        default:
            return 5
    }
}

export const VideoList = ({tags}: {tags: ITAG[]}) => {
    const [activeTag, setActiveTag] = useState<string>(tags[0].id)
    const [videoList, setVideoList] = useState<IVideo[]>([])
    const device = getDeviceIsMobile()

    useEffect(() => {
        const handleGetVideos = async () => {
                const res = await getVideos()
                setVideoList(res)


            }
        
        handleGetVideos()
    })

    // const videoCount = getVideosCount(device)
    

    return (
        <div className={styles.container}>
            <div className={styles.tagList}>
                {tags.map((tag: ITAG) => {
                    const isActive = activeTag == tag.id
                    return <div key={tag.id} onClick={() => setActiveTag(tag.id)} className={`${styles.tagList__item} ${isActive ? styles.tagList__item_active : ''}`}>
                                <Text color={isActive ? 'white' : ''}>{tag.name}</Text>
                            </div>
                    })}
            </div>
            <div className={styles.videoGrid}>
                {videoList.slice(0, getVideosCount(device)).map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
                ))}
            </div>

            <div className={styles.shortsTag}>
                <Svg name='shortsRed'/>
                <Text size={20}>Shorts</Text>
            </div>
            
            <div className={styles.videoGridHorts}>
                {videoList
                    .filter((video: IVideo) => video.isShort) 
                    .slice(0, getShortsCount(device))
                    .map((video: IVideo) => (
                    <div key={video.id} className={styles.hortsVideoCardWrapper}>
                        <ThumbnailShortVideoCard {...video} />
                    </div>
                ))}
            </div>

            <div className={styles.videoGrid}>
                {videoList.slice(getVideosCount(device) * 2 , getVideosCount(device) * 3 - 1).map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
                ))}
            </div>

            <div className={styles.shortsTag}>
                <Svg name='shortsRed'/>
                <Text size={20}>Shorts</Text>
            </div>
            
            <div className={styles.videoGridHorts}>
                {videoList
                    .filter((video: IVideo) => video.isShort) 
                    .slice(getShortsCount(device), getShortsCount(device) * 2)
                    .map((video: IVideo) => (
                    <div key={video.id} className={styles.hortsVideoCardWrapper}>
                        <ThumbnailShortVideoCard {...video} />
                    </div>
                ))}
            </div>

            <div className={styles.videoGrid}>
                {videoList.slice(getVideosCount(device) * 4).map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
                ))}
            </div>
        </div>
    );
};