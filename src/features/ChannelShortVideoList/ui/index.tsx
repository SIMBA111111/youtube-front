'use client'

import { useRef } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { VideoThumbnailSkeleton } from "@/shared/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { ThumbnailShortVideoCard } from "@/entities";
import { useInfitityScroll } from "@/shared/hooks/useInfitityScroll";
import styles from "./styles.module.scss";

export const ChannelShortVideoList = ({initShortVideoList, channelUsername}: {initShortVideoList: IVideo[], channelUsername: string}) => {
    const loadingRef = useRef<HTMLDivElement | null>(null)

    const fetchChannelVideoList = async ({
        offset,
        limit
    }: {
        offset: number,
        limit: number
    }) => {
        const res = await getVideoListByChannelUsername(channelUsername, false, undefined, limit, offset)
        return res.videos || []
    }

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfitityScroll<IVideo, any>({
        paginationStep: 5,
        filter: '',
        triggerRef: loadingRef,
        fetchData: fetchChannelVideoList
    })

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
                {data.map((video: IVideo) => (
                    <div key={video.id} className={styles.hortsVideoCardWrapper}>
                        <ThumbnailShortVideoCard {...video} />
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