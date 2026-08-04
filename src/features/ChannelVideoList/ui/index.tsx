'use client'

import { useState, useRef, useCallback } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Spinner, Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { ChannelVideosFilter } from "../filters";
import styles from "./styles.module.scss";

export enum FiltersEnum {
    NEWS='NEWS',
    FAME='FAME',
    OLD='OLD'
}

export type filterType = keyof typeof FiltersEnum

export const ChannelVideoList = ({initVideoList, channelUsername}: {initVideoList: IVideo[], channelUsername: string}) => {
    const [activeFilter, setActiveFilter] = useState<filterType>(FiltersEnum.NEWS)
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
    } = useInfinityScroll<IVideo, filterType>({
        paginationStep: 10,
        filter: activeFilter,
        triggerRef: loadingRef,
        fetchData: fetchChannelVideoList
    })

    const changeFilterAndRefresh = (newFilter: filterType) => {
        setActiveFilter(newFilter)
        refreshData()
    }

    // Если нет видео и не идет загрузка
    if(data?.length === 0 && !isLoading) {
        return (
            <div className={styles.container}>
                <ChannelVideosFilter activeFilter={activeFilter} changeFilterAndRefresh={changeFilterAndRefresh} />
                <div className={styles.videoGrid}>
                    <Text>Видео не найдены</Text>
                </div>
            </div>
        )   
    }

    return (
        <div className={styles.container} id='videoListContainer'>
            <ChannelVideosFilter activeFilter={activeFilter} changeFilterAndRefresh={changeFilterAndRefresh} />

            <div className={styles.videoGrid}>
                {data.map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
                ))}
            </div>

            {/* Индикатор загрузки и триггер для бесконечного скролла */}
            <div ref={loadingRef} style={{ height: '40px', margin: '20px' }}>
                {isLoading && (
                    <Spinner size={32} />
                )}
            </div>
        </div>
    )
}