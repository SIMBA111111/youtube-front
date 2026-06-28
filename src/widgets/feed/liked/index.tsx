'use client'

import { useEffect, useRef, useState } from "react";
import { IVideo, IVideoViewed } from "@/entities/thumbnailVideo/modal/types";
import { ITag, VideoTags } from "@/entities/videoTags/ui";
import { LIKED_TAGS } from "@/shared/constants/tags";
import { Spinner, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";
import { ThumbnailShortVideoCard } from "@/entities";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import styles from "./styles.module.scss";

export const Liked = ({ tags, meId, jwt}: {tags: ITag[], meId: string, jwt: string}) => {
    const [activeTag, setActiveTag] = useState<string>(tags[0].name);
    const loadingRef = useRef<HTMLDivElement | null>(null);

    const fetchLikedVideosList = async ({
        offset,
        limit
    }: {
        offset: number,
        limit: number
    }) => {
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
            limit,
            { isShort: isShort },
        );

        return res.likedVideos || []
    }

    const {
        data,
        hasMore,
        isLoading,
    } = useInfinityScroll<IVideo, any>({
        paginationStep: 5,
        filter: activeTag,
        triggerRef: loadingRef,
        fetchData: fetchLikedVideosList
    })

    const renderVideoList = () => {
        if (isLoading && data.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (data.length === 0) {
            return <Text>Нет видео в понравившихся</Text>;
        }

        return data.map((video, index) => (
            <div key={video.id} className={styles.video}>
                <Text>{index + 1}</Text>
                <ThumbnailVideoCard video={video} isRow />
            </div>
        ));
    };

    const renderShortsList = () => {
        if (isLoading && data.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (data.length === 0) {
            return <Text>Нет коротких видео в понравившихся</Text>;
        }

        return (
            <div className={styles.videoGridShorts}>
                {data.map((video: IVideo) => (
                    <div key={video.id} className={styles.shortVideoCardWrapper}>
                        <ThumbnailShortVideoCard {...video} />
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

            <div className={styles.videoListContainer}>
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
            </div>
            
            {hasMore && (
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