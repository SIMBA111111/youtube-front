'use client'

import { useState, useRef, useCallback } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import styles from "./styles.module.scss";

export enum FiltersEnum {
    NEWS='NEWS',
    FAME='FAME',
    OLD='OLD'
}

export const ChannelVideoList = ({initVideoList, channelUsername}: {initVideoList: IVideo[], channelUsername: string}) => {
    const [activeFilter, setActiveFilter] = useState<keyof typeof FiltersEnum>(FiltersEnum.NEWS)
    const loadingRef = useRef<HTMLDivElement | null>(null)

    const fetchChannelVideoList = async ({
        offset,
        limit
    }: {
        offset: number,
        limit: number
    }) => {
        const res = await getVideoListByChannelUsername(channelUsername, false, activeFilter, limit, offset)
        return res.videos || []
    }

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfinityScroll<IVideo, keyof typeof FiltersEnum>({
        paginationStep: 5,
        filter: activeFilter,
        triggerRef: loadingRef,
        fetchData: fetchChannelVideoList
    })

    const changeFilterAndRefresh = (newFilter: keyof typeof FiltersEnum) => {
        setActiveFilter(newFilter)
        refreshData()
    }

    // Если нет видео и не идет загрузка
    if(data?.length === 0 && !isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.filter}>
                    <button className={activeFilter === FiltersEnum.NEWS ? styles.filter_button_active : styles.filter_button} onClick={() => changeFilterAndRefresh(FiltersEnum.NEWS)}>
                        <Text color={activeFilter === FiltersEnum.NEWS ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Новые</Text>
                    </button>
                    <button className={activeFilter === FiltersEnum.FAME ? styles.filter_button_active : styles.filter_button} onClick={() => changeFilterAndRefresh(FiltersEnum.FAME)}>
                        <Text color={activeFilter === FiltersEnum.FAME ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Популярные</Text>
                    </button>
                    <button className={activeFilter === FiltersEnum.OLD ? styles.filter_button_active : styles.filter_button} onClick={() => changeFilterAndRefresh(FiltersEnum.OLD)}>
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
                    onClick={() => changeFilterAndRefresh(FiltersEnum.NEWS)}
                >
                    <Text color={activeFilter === FiltersEnum.NEWS ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Новые</Text>
                </button>
                <button 
                    className={activeFilter === FiltersEnum.FAME ? styles.filter_button_active : styles.filter_button} 
                    onClick={() => changeFilterAndRefresh(FiltersEnum.FAME)}
                >
                    <Text color={activeFilter === FiltersEnum.FAME ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Популярные</Text>
                </button>
                <button 
                    className={activeFilter === FiltersEnum.OLD ? styles.filter_button_active : styles.filter_button} 
                    onClick={() => changeFilterAndRefresh(FiltersEnum.OLD)}
                >
                    <Text color={activeFilter === FiltersEnum.OLD ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Старые</Text>
                </button>
            </div>

            <div className={styles.videoGrid}>
                {data.map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
                ))}
            </div>

            {/* Индикатор загрузки и триггер для бесконечного скролла */}
            <div ref={loadingRef} style={{ height: '100px', margin: '20px' }}>
                {isLoading && (
                    <div className={styles.videoGrid}>
                        {Array.from({length: 6}, (_, index) => (
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