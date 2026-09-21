import { memo } from "react";
import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { ThumbnailShortVideoCard } from "@/entities";
import styles from "./styles.module.scss";

interface IVideoGrid {
    videos: IVideoFullInfo[]
    isShort?: boolean
}

export const VideoGrid = memo(({ videos, isShort = false }: IVideoGrid) => {
    // console.log('ререндер VideoGrid');
    
    return isShort ? (
        <div className={styles.videoGridHorts}>
            {videos?.map((video: IVideoFullInfo, index) => (
                <div key={index} className={styles.hortsVideoCardWrapper}>
                    <ThumbnailShortVideoCard video={video} />
                </div>
            ))}
        </div>
    ) : (
        <div className={styles.videoGrid}>
            {videos.map((video: IVideoFullInfo, index) => (
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