import { memo } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { ThumbnailShortVideoCard } from "@/entities";
import styles from "./styles.module.scss";

interface IVideoGrid {
    videos: IVideo[]
    isShort?: boolean
}

export const VideoGrid = memo(({ videos, isShort = false }: IVideoGrid) => {
    // console.log('ререндер VideoGrid');
    
    return isShort ? (
        <div className={styles.videoGridHorts}>
            {videos?.map((video: IVideo, index) => (
                <div key={index} className={styles.hortsVideoCardWrapper}>
                    <ThumbnailShortVideoCard {...video} />
                </div>
            ))}
        </div>
    ) : (
        <div className={styles.videoGrid}>
            {videos.map((video: IVideo, index) => (
                <div key={index} className={styles.videoCardWrapper}>
                    <ThumbnailVideoCard video={video} />
                </div>
            ))}
        </div>
    )
}, (prevProps, nextProps) => {
    return (
        prevProps.isShort === nextProps.isShort &&
        prevProps.videos?.length === nextProps.videos?.length
    )
});