'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { VideoThumbnailSkeleton } from "@/shared/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import styles from "./styles.module.scss";
import { ThumbnailShortVideoCard } from "@/entities";

export const ChannelShortVideoList = ({initShortVideoList, channelUsername}: {initShortVideoList: IVideo[], channelUsername: string}) => {
    const [videoList, setVideoList] = useState<IVideo[]>(initShortVideoList)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement | null>(null)

    // Функция для загрузки следующих страниц (пагинация)
    const loadMoreVideos = useCallback(async () => {
        if (isLoading || !hasMore) return
        
        setIsLoading(true)
        
        try {
            const offset = page * 20
            const newVideos = await getVideoListByChannelUsername(channelUsername, true, undefined, 20, offset)
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
    }, [channelUsername, page, isLoading, hasMore])

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
                <div className={styles.videoGridHorts}>
                    <div>Короткие видео не найдены</div>
                </div>
            </div>
        )   
    }

    return (
        <div className={styles.container} id='shortVideoListContainer'>
            <div className={styles.videoGridHorts}>
                {videoList.map((video: IVideo) => (
                    <div key={video.id} className={styles.hortsVideoCardWrapper}>
                        <ThumbnailShortVideoCard {...video} />
                    </div>
                ))}
            </div>

            {/* Индикатор загрузки и триггер для бесконечного скролла */}
            <div ref={loadingRef} style={{ height: '10px', margin: '20px 0' }}>
                {isLoading && (
                    <div className={styles.videoGridHorts}>
                        {Array.from({length: 4}, (_, index) => (
                            <div key={index} className={styles.hortsVideoCardWrapper}>
                                <VideoThumbnailSkeleton />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}