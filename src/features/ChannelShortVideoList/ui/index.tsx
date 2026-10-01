'use client'

import { useEffect, useRef } from "react";
import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { VideoThumbnailSkeleton } from "@/shared/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { ThumbnailShortVideoCard } from "@/entities";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import styles from "./styles.module.scss";

export const ChannelShortVideoList = ({channelUsername}: {channelUsername: string}) => {
    const loadingRef = useRef<HTMLDivElement | null>(null)

    const fetchChannelVideoList = async ({
        offset,
        limit
    }: {
        offset: number,
        limit: number
    }) => {
        const res = await getVideoListByChannelUsername(channelUsername, true, undefined, limit, offset)
        
        if (!res) {
            return []
        }
        
        return res.data || []
    }

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfinityScroll<IVideoFullInfo, any>({
        paginationStep: 5,
        filter: '',
        triggerRef: loadingRef,
        fetchData: fetchChannelVideoList
    })

    useEffect(() => {
        refreshData()
    }, [channelUsername])

    // Если нет видео и не идет загрузка
    if(data?.length === 0 && !isLoading) {
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
                {data.map((video: IVideoFullInfo) => (
                    <div key={video.video.id} className={styles.hortsVideoCardWrapper}>
                        <ThumbnailShortVideoCard video={video} />
                    </div>
                ))}
            </div>

            {/* Индикатор загрузки и триггер для бесконечного скролла */}
            <div ref={loadingRef} style={{ height: '100px', margin: '20px' }}>
                {isLoading && (
                    <div className={styles.videoGridHorts}>
                        {Array.from({length: 6}, (_, index) => (
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