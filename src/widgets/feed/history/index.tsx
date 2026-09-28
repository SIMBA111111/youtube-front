'use client'

import { useEffect, useRef, useState } from "react";
import { IVideoViewed, IViewedVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { VideoTags } from "@/entities/videoTags/ui";
import { HISTORY_TAGS } from "@/shared/constants/tags";
import { ShortsSwiper, Spinner, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { splitVideoEntitiesByDays } from "@/shared/utils/splitEntitiesByDays";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { ITagEntity } from "@/entities/videoTags/model";
import styles from "./styles.module.scss";


export const History = ({ userId, jwt, tags}: {userId: string, jwt: string, tags: ITagEntity[]}) => {
    const [activeTag, setActiveTag] = useState<string>(tags[0].name);
    const loadingRef = useRef<HTMLDivElement | null>(null);

    const fetchHistoryVideosData = async ({
        offset,
        limit
    }: {
        offset: number,
        limit: number
    }) => {
        let isShort: boolean | null = null;
        
        if (activeTag === HISTORY_TAGS[2].name) {
            isShort = true;
        } else if (activeTag === HISTORY_TAGS[1].name) {
            isShort = false;
        }

        const res = await getHistoryVideos(
            userId,
            jwt,
            {
                isShort: isShort,
                tags: activeTag
            }, 
            offset,
            limit,
        );

        return res?.data || []
    }

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfinityScroll<IViewedVideoFullInfo, any>({
        paginationStep: 5,
        filter: activeTag,
        triggerRef: loadingRef,
        fetchData: fetchHistoryVideosData
    })

    useEffect(() => {
        refreshData()
    }, [activeTag])

    const groupedVideos = splitVideoEntitiesByDays<IViewedVideoFullInfo>(data);

    const renderVideoList = () => {
        if (isLoading && data.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (data.length === 0) {
            return <Text>Нет видео в истории</Text>;
        }

        return Array.from(groupedVideos.entries()).map(([date, items]) => {
            
            console.log(items);
            
            
            const shorts = items.filter((i) => i.video.isShort);
            const fullVideos = items.filter((i) => !i.video.isShort);

            return (
                <div key={date} className={styles.date}>
                    <Text size={20} weight={500}>{date}</Text>
                    {shorts && shorts.length > 0 && (
                        <div className={styles.videoShortList}>
                            <ShortsSwiper videos={shorts} />
                        </div>
                    )}
                    {fullVideos.map((video) => (
                        <ThumbnailVideoCard key={video.video.id} video={video} isRow />
                    ))}
                </div>
            );
        });
    };

    const renderShortsList = () => {
        if (isLoading && data.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (data.length === 0) {
            return <Text>Нет коротких видео в истории</Text>;
        }

        return Array.from(groupedVideos.entries()).map(([date, items]) => (
            <div key={date} className={styles.date}>
                <Text size={20} weight={500}>{date}</Text>
                <ShortsSwiper videos={items} />
            </div>
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.tagList}>
                {tags.map((tag: ITagEntity) => (
                    <VideoTags 
                        key={tag.id} 
                        name={tag.name} 
                        id={tag.id} 
                        activeTag={activeTag} 
                        setActiveTag={setActiveTag} 
                    />
                ))}
            </div>

            {activeTag !== HISTORY_TAGS[2].name && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[2].name && (
                <div className={styles.videoList}>
                    {renderShortsList()}
                </div>
            )}


            {(
                <div ref={loadingRef} style={{ height: "50px", margin: "20px" }}>
                    {isLoading && (
                        <div className={styles.spinner}>
                            <Spinner />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};