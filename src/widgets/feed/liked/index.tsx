'use client'

import { useEffect, useState } from "react";

import { IVideo, IVideoViewed } from "@/entities/thumbnailVideo/modal/types";
import { ITag, VideoTags } from "@/entities/videoTags/ui";
import { LIKED_TAGS } from "@/shared/constants/tags";
import { ShortsSwiper, Text } from "@/shared/ui";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";

import styles from "./styles.module.scss";
import { ThumbnailShortVideoCard } from "@/entities";


export const Liked = ({initVideos}: {initVideos : IVideoViewed[]}) => {
    const [activeTag, setActiveTag] = useState<string>(LIKED_TAGS[0].id);
    const [videos, setVideos] = useState<IVideoViewed[]>(initVideos);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleVideos = async () => {
            setIsLoading(true);
            try {
                let isShort: boolean | null = null;
                if (activeTag === LIKED_TAGS[2].id) {
                    isShort = true;
                } else if (activeTag === LIKED_TAGS[1].id) {
                    isShort = false;
                }
                
                const res = await getLikedVideos({ 
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

  


    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }
    
    return (
        <div>
            <div className={styles.tagList}>
                {LIKED_TAGS.map((tag: ITag) => (
                    <VideoTags 
                        key={tag.id} 
                        name={tag.name} 
                        id={tag.id} 
                        activeTag={activeTag} 
                        setActiveTag={setActiveTag} 
                    />
                ))}
            </div>

            {activeTag === LIKED_TAGS[0].id && videos.map((video, index) => (
                <div key={video.id} className={styles.video}>
                    <Text>{index+1}</Text>
                    <ThumbnailVideoCard key={video.id} video={video} isRow />
                </div>
            ))}
            
            {activeTag === LIKED_TAGS[1].id && videos.map((video, index) => (
                <div key={video.id} className={styles.video}>
                    <Text>{index+1}</Text>
                    <ThumbnailVideoCard key={video.id} video={video} isRow />
                </div>
            ))}
            
            {activeTag === LIKED_TAGS[2].id && videos.map((video) => (
                <div className={styles.videoGridHorts}>
                    {videos.map((video: IVideo) => (
                            <div key={video.id} className={styles.hortsVideoCardWrapper}>
                                <ThumbnailShortVideoCard {...video} />
                            </div>
                        ))}
                </div>
            ))}

        </div>
    );
};