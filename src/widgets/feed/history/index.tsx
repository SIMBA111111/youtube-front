'use client'

import { useEffect, useState } from "react";

import { IVideo, IVideoViewed } from "@/entities/thumbnailVideo/modal/types";
import { ITag, VideoTags } from "@/entities/videoTags/ui";
import { HISTORY_TAGS } from "@/shared/constants/tags";
import { ShortsSwiper, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";

import styles from "./styles.module.scss";
import { splitEntitiesByDays } from "@/shared/utils/splitEntitiesByDays";


export const History = ({initVideos}: {initVideos : IVideoViewed[]}) => {
    const [activeTag, setActiveTag] = useState<string>(HISTORY_TAGS[0].id);
    const [videos, setVideos] = useState<IVideoViewed[]>(initVideos);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleVideos = async () => {
            setIsLoading(true);
            try {
                let isShort: boolean | null = null;
                if (activeTag === HISTORY_TAGS[2].id) {
                    isShort = true;
                } else if (activeTag === HISTORY_TAGS[1].id) {
                    isShort = false;
                }
                
                const res = await getHistoryVideos({ 
                    tags: [activeTag], 
                    isShort: isShort 
                });
                
                setVideos(res);
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        handleVideos();
    }, [activeTag]);

    const groupedVideos = splitEntitiesByDays(videos);

    const renderVideoList = () => {
        if (isLoading) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
            return <Text>Нет видео в истории</Text>;
        }

        return Array.from(groupedVideos.entries()).map(([date, items]) => {
            const shorts = items.filter((i) => i.isShort)
            const fullVideos = items.filter((i) => !i.isShort)
        
            return (
                <div key={date} className={styles.date}>
                    <Text size={20} weight={500}>{date}</Text>
                    {shorts && shorts.length > 0 && (
                        <div className={styles.videoShortList}>
                            <ShortsSwiper videos={videos.filter(v => v.isShort)} />
                        </div>
                    )}
                    {fullVideos.map((video) => (
                        <ThumbnailVideoCard key={video.id} video={video} isRow />
                    ))}
                </div>
            )
            
        });
    };

    const renderShortsList = () => {
        if (isLoading) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
            return <Text>Нет коротких видео в истории</Text>;
        }

        return (
            Array.from(groupedVideos.entries()).map(([date, items]) => (
                <div key={date} className={styles.date}>
                    <Text size={20} weight={500}>{date}</Text>
                    <ShortsSwiper videos={items} />
                </div>
            ))
        )
    };

    return (
        <div>
            <div className={styles.tagList}>
                {HISTORY_TAGS.map((tag: ITag) => (
                    <VideoTags 
                        key={tag.id} 
                        name={tag.name} 
                        id={tag.id} 
                        activeTag={activeTag} 
                        setActiveTag={setActiveTag} 
                    />
                ))}
            </div>

            {activeTag === HISTORY_TAGS[0].id && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[1].id && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[2].id && (
                <div className={styles.videoList}>
                    {renderShortsList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[3].id && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === HISTORY_TAGS[4].id && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}
        </div>
    );
};