'use client'

import { useEffect, useRef, useState } from "react";
import { IVideoViewed } from "@/entities/thumbnailVideo/modal/types";
import { ITag, VideoTags } from "@/entities/videoTags/ui";
import { HISTORY_TAGS } from "@/shared/constants/tags";
import { ShortsSwiper, Spinner, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { splitEntitiesByDays } from "@/shared/utils/splitEntitiesByDays";
import styles from "./styles.module.scss";

export const History = ({initVideos, userId, jwt, tags}: {initVideos: IVideoViewed[], userId: string, jwt: string, tags: ITag[]}) => {
    const [activeTag, setActiveTag] = useState<string>(tags[0].name);
    const [videos, setVideos] = useState<IVideoViewed[]>(initVideos);
    const [pagination, setPagination] = useState({offset: 20, limit: 40});
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Добавляем флаг наличия данных
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const isInitialMount = useRef(true);
    const isFetchingRef = useRef(false); // Предотвращаем множественные запросы

    // Функция загрузки видео
    const fetchVideos = async (offset: number, isReset: boolean = false) => {
        if (isFetchingRef.current) return;
        
        isFetchingRef.current = true;
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
                {isShort: isShort, tags: activeTag === HISTORY_TAGS[0].name ? 'all' : activeTag}, 
                offset,
                pagination.limit,
            );

            if (isReset) {
                setVideos(res.viewsHistory);
                setPagination({offset: offset + 20, limit: pagination.limit});
                setHasMore(res.viewsHistory.length === pagination.limit);
            } else {
                setVideos(prev => [...prev, ...res.viewsHistory]);
                setPagination(prev => ({offset: prev.offset + 20, limit: prev.limit}));
                setHasMore(res.viewsHistory.length === pagination.limit);
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    };

    // Эффект для смены тега
    useEffect(() => {
        // Пропускаем первый рендер, так как данные уже есть в initVideos
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Сбрасываем состояние при смене тега
        setHasMore(true);
        fetchVideos(0, true);
        
        // Отключаем observer при смене тега
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
    }, [activeTag]);

    // Настройка observer
    useEffect(() => {
        // Не настраиваем observer, если нет данных или больше нет записей
        if (videos.length === 0 || !hasMore || isLoading) {
            return;
        }
        
        if (!loadingRef.current) return;
        
        // Если observer уже существует, не создаем новый
        if (observerRef.current) return;

        const callback = async (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            
            if (entry.isIntersecting && !isLoading && hasMore && !isFetchingRef.current) {
                console.log('ДОСТИГЛИ ДНА, ГРУЗИМ СТРАНИЦУ');
                await fetchVideos(pagination.offset, false);
            }
        }

        observerRef.current = new IntersectionObserver(callback, {
            root: null,
            rootMargin: "100px",
            threshold: 0.1 // Изменяем threshold на 0.1 для более раннего срабатывания
        });
        
        observerRef.current.observe(loadingRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        }
    }, [videos.length, hasMore, isLoading, pagination.offset]);

    const groupedVideos = splitEntitiesByDays(videos);

    const renderVideoList = () => {
        if (isLoading && videos.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
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
        if (isLoading && videos.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
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

            {hasMore && (
                <div ref={loadingRef}>
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