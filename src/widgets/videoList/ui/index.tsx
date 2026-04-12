'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Svg, Text, VideoThumbnailSkeleton } from "@/shared/ui";
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
    const [isLoading, setIsLoading] = useState(false)
    const device = useDeviceIsMobile()
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement | null>(null)

    // Первая загрузка
    useEffect(() => {
        const loadFirstVideos = async () => {
            setTimeout(async () => {
                const res = await getVideos()
                setVideoList(res)
            },  3000)
        }
        loadFirstVideos()
    }, [])

    // Настройка observer - ТОЛЬКО ОДИН РАЗ
    useEffect(() => {
        if (!loadingRef.current) return
        if (observerRef.current) return

        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 1
        }

        const callback = async (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0]
            
            if (entry.isIntersecting && !isLoading) {
                console.log('ДОСТИГЛИ ДНА, ГРУЗИМ СТРАНИЦУ')
                setIsLoading(true)
                
                try {
                    setTimeout(async () => {
                        const newVideos = await getVideos()
                        console.log('ПОЛУЧЕНО НОВЫХ ВИДЕО:', newVideos.length)
                        setVideoList(prev => [...prev, ...newVideos])
                        setIsLoading(false) // Важно: выключаем загрузку после получения данных
                    }, 3000)
                } catch (error) {
                    console.error('ОШИБКА ЗАГРУЗКИ:', error)
                    setIsLoading(false) // Важно: выключаем загрузку при ошибке
                }
            }
        }

        observerRef.current = new IntersectionObserver(callback, options)
        observerRef.current.observe(loadingRef.current)

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }
        }
    }, []) // Добавил зависимости

    
    if(videoList?.length <= 0) {
        return (
            <div ref={loadingRef} style={{ height: '10px', margin: '20px 0' }} className={styles.videoGrid}>
                {(isLoading || videoList?.length <= 0) && Array.from({length: 12}, (_, index) => {
                        return <div key={index} className={styles.videoCardWrapper}>
                            <VideoThumbnailSkeleton />
                        </div>
                }) }   
            </div>
        )   
    }

    return (
        <div className={styles.container} id='videoListContainer'>
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
                {videoList
                    .filter((video: IVideo) => !video.isShort) 
                    .slice(getVideosCount(device), getVideosCount(device) * 2)
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
                    .filter((video: IVideo) => !video.isShort) 
                    .slice(getVideosCount(device) * 2)
                    .map((video: IVideo, index) => (
                        <div key={index} className={styles.videoCardWrapper}>
                            <ThumbnailVideoCard video={video} />
                        </div>
                    ))}
            </div>

            {/* ЭТОТ СПАН - ТРИГГЕР ДЛЯ ПОДГРУЗКИ */}
            <div ref={loadingRef} style={{ height: '10px', margin: '20px 0' }} className={styles.videoGrid}>
                {(isLoading || videoList?.length <= 0) && Array.from({length: 12}, (_, index) => {
                      return <div key={index} className={styles.videoCardWrapper}>
                            <VideoThumbnailSkeleton />
                        </div>
                }) }   
            </div>
        </div>
    )
}