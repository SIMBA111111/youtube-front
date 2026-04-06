import { IVideo } from "@/entities/thumbnailVideo/modal/types"
import Image from "next/image"
import styles from "./styles.module.scss"
import { formatDuration } from "@/shared/utils/formatDuration"
import { formatViews } from "@/shared/utils/formatViews"
import { formatDate } from "@/shared/utils/formatDate"

interface IRecommentedVideos {
    videos: IVideo[]
}

export const RecommentedVideos: React.FC<IRecommentedVideos> = ({ videos }) => {
    return (
        <div className={styles.container}>
            {videos.map((video) => (
                <div key={video.id} className={styles.videoCard}>
                    <div className={styles.thumbnail}>
                        <Image
                            src={video.previewUrl}
                            alt={video.name}
                            fill
                            className={styles.thumbnailImage}
                        />
                        <span className={styles.duration}>
                            {formatDuration(video.duration)}
                        </span>
                        
                        {video.isShort && (
                            <span className={styles.shortsBadge}>
                                SHORTS
                            </span>
                        )}
                    </div>

                    <div className={styles.info}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>
                                {video.name}
                            </h3>
                            {/* <button className={styles.menuButton}>
                                че это
                            </button> */}
                        </div>
                        
                        <p className={styles.channelName}>
                            {video.channel.name}
                        </p>
                        
                        <div className={styles.metadata}>
                            <span>{formatViews(video.viewersCount)} просмотров</span>
                            <span>•</span>
                            <span>{formatDate(video.datePublication || '')}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}