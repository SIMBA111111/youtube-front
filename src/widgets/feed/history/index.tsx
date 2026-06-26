'use client'

import { useEffect, useRef, useState } from "react";
import { IVideoViewed } from "@/entities/thumbnailVideo/modal/types";
import { ITag, VideoTags } from "@/entities/videoTags/ui";
import { HISTORY_TAGS } from "@/shared/constants/tags";
import { ShortsSwiper, Spinner, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { splitEntitiesByDays } from "@/shared/utils/splitEntitiesByDays";
import { useInfitityScroll } from "@/shared/hooks/useInfitityScroll";
import styles from "./styles.module.scss";

export const History = ({ userId, jwt, tags}: {userId: string, jwt: string, tags: ITag[]}) => {
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
                tags: activeTag === HISTORY_TAGS[0].name ? 'all' : activeTag
            }, 
            offset,
            limit,
        );

        return res?.viewsHistory || []
    }

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfitityScroll<IVideoViewed, any>({
        paginationStep: 5,
        filter: activeTag,
        triggerRef: loadingRef,
        fetchData: fetchHistoryVideosData
    })

    const groupedVideos = splitEntitiesByDays(data);

    const renderVideoList = () => {
        if (isLoading && data.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (data.length === 0) {
            return <Text>Нет видео в истории</Text>;
        }

        return Array.from(groupedVideos.entries()).map(([date, items]) => {
            const shorts = items.filter((i) => i.isShort);
            const fullVideos = items.filter((i) => !i.isShort);

            return (
                <div key={date} className={styles.date}>
                    <Text size={20} weight={500}>{date}</Text>
                    {shorts && shorts.length > 0 && (
                        <div className={styles.videoShortList}>
                            <ShortsSwiper videos={shorts} />
                        </div>
                    )}
                    {fullVideos.map((video) => (
                        <ThumbnailVideoCard key={video.id} video={video} isRow />
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
                {tags.map((tag: ITag) => (
                    <VideoTags 
                        key={tag.id} 
                        name={tag.name} 
                        id={tag.id} 
                        activeTag={activeTag} 
                        setActiveTag={setActiveTag} 
                    />
                ))}
            </div>

            {activeTag === HISTORY_TAGS[0].name && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[1].name && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[2].name && (
                <div className={styles.videoList}>
                    {renderShortsList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[3].name && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[4].name && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {(
                <div ref={loadingRef} style={{ height: "100px", margin: "20px" }}>
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