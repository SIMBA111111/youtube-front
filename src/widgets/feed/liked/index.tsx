'use client'

import { useEffect, useRef, useState } from "react";
import { IVideo, IVideoViewed } from "@/entities/thumbnailVideo/modal/types";
import { ITag, VideoTags } from "@/entities/videoTags/ui";
import { LIKED_TAGS } from "@/shared/constants/tags";
import { Spinner, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";
import { ThumbnailShortVideoCard } from "@/entities";
import styles from "./styles.module.scss";
import { ThumbnailShortVideoSmallCard } from "@/entities/thumbnailShortVideo/ui/SmallCard";

export const Liked = ({initVideos, tags, meId, jwt}: {initVideos: IVideoViewed[], tags: ITag[], meId: string, jwt: string}) => {
    const [activeTag, setActiveTag] = useState<string>(tags[0].name);
    const [videos, setVideos] = useState<IVideoViewed[]>(initVideos);
    const [pagination, setPagination] = useState({offset: 20, limit: 40});
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const isInitialMount = useRef(true);
    const isFetchingRef = useRef(false);

    // Функция загрузки видео
    const fetchVideos = async (offset: number, isReset: boolean = false) => {
        if (isFetchingRef.current) return;
        
        isFetchingRef.current = true;
        setIsLoading(true);
        
        try {
            let isShort: boolean | null = null;
            if (activeTag === LIKED_TAGS[2].name) {
                isShort = true;
            } else if (activeTag === LIKED_TAGS[1].name) {
                isShort = false;
            }

            const res = await getLikedVideos(
                meId, 
                jwt, 
                offset,
                pagination.limit,
                { isShort: isShort },
            );

            if (isReset) {
                setVideos(res.likedVideos);
                setPagination({offset: offset + 20, limit: pagination.limit});
                setHasMore(res.likedVideos.length === pagination.limit);
            } else {
                setVideos(prev => [...prev, ...res.likedVideos]);
                setPagination(prev => ({offset: prev.offset + 20, limit: prev.limit}));
                setHasMore(res.likedVideos.length === pagination.limit);
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
            threshold: 0.1
        });
        
        observerRef.current.observe(loadingRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        }
    }, [videos.length, hasMore, isLoading, pagination.offset]);

    console.log('videos = ', videos);
    

    const renderVideoList = () => {
        if (isLoading && videos.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
            return <Text>Нет видео в понравившихся</Text>;
        }

        return videos.map((video, index) => (
            <div key={video.id} className={styles.video}>
                <Text>{index + 1}</Text>
                <ThumbnailVideoCard video={video} isRow />
            </div>
        ));
    };

    const renderShortsList = () => {
        if (isLoading && videos.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
            return <Text>Нет коротких видео в понравившихся</Text>;
        }

        return (
            <div className={styles.videoGridShorts}>
                {videos.map((video: IVideoViewed, index) => (
                    <div key={video.id} className={styles.shortsVideoCardWrapper}>
                        <Text>{index + 1}</Text>
                        <ThumbnailShortVideoSmallCard {...video} />
                    </div>
                ))}
            </div>
        );
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

            {activeTag === LIKED_TAGS[0].name && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === LIKED_TAGS[1].name && (
                <div className={styles.videoList}>
                    {renderVideoList()}
                </div>
            )}

            {activeTag === LIKED_TAGS[2].name && (
                <div className={styles.videoList}>
                    {renderShortsList()}
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