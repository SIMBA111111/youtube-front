'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Svg, Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import styles from "./styles.module.scss";
import { handleFilter } from "../lib/handleFilter";

export enum FiltersEnum {
    NEWS='NEWS',
    FAME='FAME',
    OLD='OLD'
}

export const ChannelVideoList = ({initVideoList, channelUsername}: {initVideoList: IVideo[], channelUsername: string}) => {
    const [videoList, setVideoList] = useState<IVideo[]>(initVideoList)
    const [isLoading, setIsLoading] = useState(false)
    const [activeFilter, setActiveFilter] = useState(FiltersEnum.NEWS)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const device = useDeviceIsMobile()
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement | null>(null)

    // Функция для сброса и загрузки новых данных при смене фильтра
    const resetAndLoadNewData = useCallback(async (newFilter: FiltersEnum) => {
        setIsLoading(true)
        setVideoList([]) // Очищаем список
        setPage(1) // Сбрасываем страницу
        setHasMore(true) // Сбрасываем флаг наличия данных
        
        try {
            const newVideos = await getVideoListByChannelUsername(channelUsername, false, newFilter, 20, 0)
            console.log('ЗАГРУЖЕНО ПРИ СМЕНЕ ФИЛЬТРА:', newVideos.videos.length)
            
            if(newVideos.videos.length === 0 || newVideos.total <= newVideos.videos.length) {
                setHasMore(false)
            }
            
            setVideoList(newVideos.videos)
            setActiveFilter(newFilter)
            setPage(prev => prev + 1)
        } catch (error) {
            console.error('ОШИБКА ЗАГРУЗКИ ПРИ СМЕНЕ ФИЛЬТРА:', error)
        } finally {
            setIsLoading(false)
        }
    }, [channelUsername])

    // Функция для загрузки следующих страниц (пагинация)
    const loadMoreVideos = useCallback(async () => {
        if (isLoading || !hasMore) return
        
        setIsLoading(true)
        
        try {
            const offset = page * 20
            const newVideos = await getVideoListByChannelUsername(channelUsername, false, activeFilter, offset, page * 20)
            console.log('ПОЛУЧЕНО НОВЫХ ВИДЕО (ПАГИНАЦИЯ):', newVideos.videos.length)
            
            if(newVideos.videos.length === 0) {
                setHasMore(false)
            } else {
                setVideoList(prev => [...prev, ...newVideos.videos])
                setPage(prev => prev + 1)
                
                if(newVideos.total <= offset + newVideos.videos.length) {
                    setHasMore(false)
                }
            }
        } catch (error) {
            console.error('ОШИБКА ЗАГРУЗКИ (ПАГИНАЦИЯ):', error)
        } finally {
            setIsLoading(false)
        }
    }, [channelUsername, activeFilter, page, isLoading, hasMore])

    // Observer для бесконечного скролла
    useEffect(() => {
        if (!loadingRef.current) return
        if (observerRef.current) observerRef.current.disconnect()

        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 0.1
        }

        const callback = async (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0]
            
            if (entry.isIntersecting && !isLoading && hasMore) {
                console.log('ДОСТИГЛИ ДНА, ГРУЗИМ СЛЕДУЮЩУЮ СТРАНИЦУ')
                await loadMoreVideos()
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
    }, [isLoading, hasMore, loadMoreVideos])

    // Если нет видео и не идет загрузка
    if(videoList?.length === 0 && !isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.filter}>
                    <button className={activeFilter === FiltersEnum.NEWS ? styles.filter_button_active : styles.filter_button} onClick={() => resetAndLoadNewData(FiltersEnum.NEWS)}>
                        <Text color={activeFilter === FiltersEnum.NEWS ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Новые</Text>
                    </button>
                    <button className={activeFilter === FiltersEnum.FAME ? styles.filter_button_active : styles.filter_button} onClick={() => resetAndLoadNewData(FiltersEnum.FAME)}>
                        <Text color={activeFilter === FiltersEnum.FAME ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Популярные</Text>
                    </button>
                    <button className={activeFilter === FiltersEnum.OLD ? styles.filter_button_active : styles.filter_button} onClick={() => resetAndLoadNewData(FiltersEnum.OLD)}>
                        <Text color={activeFilter === FiltersEnum.OLD ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Старые</Text>
                    </button>
                </div>
                <div className={styles.videoGrid}>
                    <Text>Видео не найдены</Text>
                </div>
            </div>
        )   
    }

    return (
        <div className={styles.container} id='videoListContainer'>
            <div className={styles.filter}>
                <button 
                    className={activeFilter === FiltersEnum.NEWS ? styles.filter_button_active : styles.filter_button} 
                    onClick={() => resetAndLoadNewData(FiltersEnum.NEWS)}
                >
                    <Text color={activeFilter === FiltersEnum.NEWS ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Новые</Text>
                </button>
                <button 
                    className={activeFilter === FiltersEnum.FAME ? styles.filter_button_active : styles.filter_button} 
                    onClick={() => resetAndLoadNewData(FiltersEnum.FAME)}
                >
                    <Text color={activeFilter === FiltersEnum.FAME ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Популярные</Text>
                </button>
                <button 
                    className={activeFilter === FiltersEnum.OLD ? styles.filter_button_active : styles.filter_button} 
                    onClick={() => resetAndLoadNewData(FiltersEnum.OLD)}
                >
                    <Text color={activeFilter === FiltersEnum.OLD ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Старые</Text>
                </button>
            </div>

            <div className={styles.videoGrid}>
                {videoList.map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
                ))}
            </div>

            {/* Индикатор загрузки и триггер для бесконечного скролла */}
            <div ref={loadingRef} style={{ height: '10px', margin: '20px 0' }}>
                {isLoading && (
                    <div className={styles.videoGrid}>
                        {Array.from({length: 4}, (_, index) => (
                            <div key={index} className={styles.videoCardWrapper}>
                                <VideoThumbnailSkeleton />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}