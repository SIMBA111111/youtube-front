'use client'

import { useState, useEffect } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Svg, Text } from "@/shared/ui";

import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { ThumbnailShortVideoCard, VideoTags } from "@/entities";
import styles from "./styles.module.scss";


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
    const device = useDeviceIsMobile()

    console.log(videoList);
    

    useEffect(() => {
        const handleGetVideos = async () => {
                const res = await getVideos()
                setVideoList(res)
            }
        
        handleGetVideos()
    }, [])
    

    return (
        <div className={styles.container}>
            <div className={styles.tagList}>
                {tags.map((tag: ITAG, index) => {
                    return <VideoTags key={index} id={tag.id} name={tag.name} activeTag={activeTag} setActiveTag={setActiveTag}/>
                })}
            </div>
            <div className={styles.videoGrid}>
                {videoList
                    .filter((video: IVideo) => !video.isShort) 
                    .slice(0, getVideosCount(device))
                    .map((video: IVideo) => (
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
                {videoList.slice(getVideosCount(device), getVideosCount(device) * 2)
                    .filter((video: IVideo) => !video.isShort) 
                    .slice(0, getShortsCount(device))
                    .map((video: IVideo) => (
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
                {videoList
                    .filter((video: IVideo) => video.isShort) 
                    .slice(getVideosCount(device) * 2)
                    .map((video: IVideo) => (
                        <div key={video.id} className={styles.videoCardWrapper}>
                            <ThumbnailVideoCard video={video} />
                        </div>
                ))}
            </div>
        </div>
    );
};