'use client'

import { useEffect, useRef, useState } from "react";
import { IVideoEntity, IVideoFullInfo, IVideoViewed } from "@/entities/thumbnailVideo/model/types";
import { VideoTags } from "@/entities/videoTags/ui";
import { LIKED_TAGS } from "@/shared/constants/tags";
import { Spinner, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";
import { ThumbnailShortVideoCard } from "@/entities";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { ITagEntity } from "@/entities/videoTags/model";
import styles from "./styles.module.scss";


export const Liked = ({ tags, meId, jwt}: {tags: ITagEntity[], meId: string, jwt: string}) => {
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
        if (activeTag === LIKED_TAGS[0].name) {
            isShort = null;
        } else if (activeTag === LIKED_TAGS[1].name) {
            isShort = false;
        } else if (activeTag === LIKED_TAGS[2].name) {
            isShort = true;
        }

        const res = await getLikedVideos(
            meId, 
            jwt, 
            offset,
            limit,
            { isShort: isShort },
        );

        return res.data || []
    }

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfinityScroll<IVideoFullInfo, any>({
        paginationStep: 5,
        filter: activeTag,
        triggerRef: loadingRef,
        fetchData: fetchLikedVideosList
    })

    useEffect(() => {
        refreshData()
    }, [activeTag])

    const renderVideoList = (videos: IVideoFullInfo[]) => {
        if (isLoading && videos.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
            return <Text>Нет видео в понравившихся</Text>;
        }

        return videos.map((video, index) => (
            <div key={video.video.id} className={styles.video}>
                <Text>{index + 1}</Text>
                <ThumbnailVideoCard video={video} isRow />
            </div>
        ));
    };

    const renderShortsList = (videos: IVideoFullInfo[]) => {
        if (isLoading && videos.length === 0) {
            return <Text>Загрузка...</Text>;
        }

        if (videos.length === 0) {
            return <Text>Нет коротких видео в понравившихся</Text>;
        }

        return (
            <div className={styles.videoGridShorts}>
                {videos.map((video: IVideoFullInfo) => (
                    <div key={video.video.id} className={styles.shortVideoCardWrapper}>
                        <ThumbnailShortVideoCard video={video} />
                    </div>
                ))}
            </div>
        );
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

            <div className={styles.videoListContainer}>
                {activeTag === LIKED_TAGS[0].name && (
                    <>
                        <div className={styles.videoList}>
                            {renderShortsList(data.filter(v => v.video.isShort))}
                        </div>
                        <div className={styles.videoList}>
                            {renderVideoList(data.filter(v => !v.video.isShort))}
                        </div>
                    </>
                )}

                {activeTag === LIKED_TAGS[1].name && (
                    <div className={styles.videoList}>
                        {renderVideoList(data)}
                    </div>
                )}

                {activeTag === LIKED_TAGS[2].name && (
                    <div className={styles.videoList}>
                        {renderShortsList(data)}
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