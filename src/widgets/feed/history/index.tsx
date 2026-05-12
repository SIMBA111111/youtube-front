'use client'

import { useEffect, useRef, useState } from "react";

import { IVideo, IVideoViewed } from "@/entities/thumbnailVideo/modal/types";
import { ITag, VideoTags } from "@/entities/videoTags/ui";
import { HISTORY_TAGS } from "@/shared/constants/tags";
import { ShortsSwiper, Spinner, Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { splitEntitiesByDays } from "@/shared/utils/splitEntitiesByDays";

import styles from "./styles.module.scss";


export const History = ({initVideos, userId, jwt, tags}: {initVideos : IVideoViewed[], userId: string, jwt: string, tags: ITag[]}) => {
    const [activeTag, setActiveTag] = useState<string>(tags[0].name);
    const [videos, setVideos] = useState<IVideoViewed[]>(initVideos);
    const [pagination, setPagination] = useState<any>({offset: 20, limit: 40});
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const isFirstRender = useRef(true); // Добавляем флаг первого рендера

    // Эффект для смены тега (не запускаем при первом рендере)
    useEffect(() => {
        // Пропускаем первый рендер
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const handleVideos = async () => {
            setIsLoading(true);
            try {
                let isShort: boolean | null = null;
                if (activeTag === HISTORY_TAGS[2].name) {
                    isShort = true;
                } else if (activeTag === HISTORY_TAGS[1].name) {
                    isShort = false;
                }

                const res = await getHistoryVideos( 
                    userId,
                    jwt,
                    {isShort: isShort, tags: activeTag}, 
                    0, // Сброс пагинации при смене тега
                    20,
                );

                setVideos(res.viewsHistory);
                setPagination({offset: 20, limit: 40}); // Сброс пагинации
            } catch (error) {
                console.error('Error fetching videos:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        handleVideos();
    }, [activeTag, userId, jwt]); // Добавлены зависимости

    // Настройка observer - только после загрузки начальных данных
    useEffect(() => {
        // Не настраиваем observer, если нет видео или они загружаются
        if (videos.length === 0 || isLoading) return;
        
        if (!loadingRef.current) return;
        if (observerRef.current) return;

        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 1
        }

        const callback = async (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            
            if (entry.isIntersecting && !isLoading) {
                console.log('ДОСТИГЛИ ДНА, ГРУЗИМ СТРАНИЦУ');
                setIsLoading(true);
                
                try {
                    let isShort: boolean | null = null;
                    if (activeTag === HISTORY_TAGS[2].name) {
                        isShort = true;
                    } else if (activeTag === HISTORY_TAGS[1].name) {
                        isShort = false;
                    }
                    
                    const newVideos = await getHistoryVideos(
                        userId,
                        jwt,
                        {isShort: isShort, tags: activeTag}, 
                        pagination.offset,
                        pagination.limit,
                    );
                    
                    if (newVideos.viewsHistory.length === 0) { // Исправлено: === вместо =
                        observerRef.current?.disconnect();
                        loadingRef.current = null;
                        setIsLoading(false);
                        return;
                    }

                    setVideos(prev => [...prev, ...newVideos.viewsHistory]);
                    setPagination(prev => ({
                        offset: prev.offset + 20,
                        limit: prev.limit + 20,
                    }));
                } catch (error) {
                    console.error('ОШИБКА ЗАГРУЗКИ:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }

        observerRef.current = new IntersectionObserver(callback, options);
        observerRef.current.observe(loadingRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        }
    }, [videos.length, activeTag, pagination.offset]); // Добавлены зависимости
    

    const groupedVideos = splitEntitiesByDays(videos);

    const renderVideoList = () => {
        if (isLoading && videos.length === 0) {
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
                            <ShortsSwiper videos={shorts} />
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
        if (isLoading && videos.length === 0) {
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

            <div ref={loadingRef}>
                {(isLoading &&
                        <div className={styles.spinner}>
                            <Spinner />
                        </div>
                )}
            </div>
        </div>
    );
};