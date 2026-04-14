'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Svg, Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { getVideoListByChannelHash } from "@/shared/api/video/getVideoListByChannelHash";
import styles from "./styles.module.scss";
import { handleFilter } from "../lib/handleFilter";

export enum FiltersEnum {
    NEWS='NEWS',
    FAME='FAME',
    OLD='OLD'
}

export const ChannelVideoList = ({initVideoList, channelHash}: {initVideoList: IVideo[], channelHash: string}) => {
    const [videoList, setVideoList] = useState<IVideo[]>(initVideoList)
    const [isLoading, setIsLoading] = useState(false)
    const [activeFilter, setActiveFilter] = useState(FiltersEnum.NEWS)
    const device = useDeviceIsMobile()
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement | null>(null)

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
            <div className={styles.filter}>
                <button className={activeFilter === FiltersEnum.NEWS ? styles.filter_button_active : styles.filter_button} onClick={() => handleFilter(channelHash, FiltersEnum.NEWS, setActiveFilter)}>
                    <Text color={activeFilter === FiltersEnum.NEWS ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Новые</Text>
                </button>
                <button className={activeFilter === FiltersEnum.FAME? styles.filter_button_active : styles.filter_button} onClick={() => handleFilter(channelHash, FiltersEnum.FAME, setActiveFilter)}>
                    <Text color={activeFilter === FiltersEnum.FAME ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Популярные</Text>
                </button>
                <button className={activeFilter === FiltersEnum.OLD? styles.filter_button_active : styles.filter_button} onClick={() => handleFilter(channelHash, FiltersEnum.OLD, setActiveFilter)}>
                    <Text color={activeFilter === FiltersEnum.OLD ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Старые</Text>
                </button>
            </div>

            <div className={styles.videoGrid}>
                {videoList
                    .map((video: IVideo) => (
                        <div key={video.id} className={styles.videoCardWrapper}>
                            <ThumbnailVideoCard video={video} />
                        </div>
                ))}
            </div>

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