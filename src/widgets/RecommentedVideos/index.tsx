import { IVideo } from "@/entities/thumbnailVideo/modal/types"
import Image from "next/image"
import styles from "./styles.module.scss"
import { formatDuration } from "@/shared/utils/formatDuration"
import { formatViews } from "@/shared/utils/formatViews"
import { formatDate } from "@/shared/utils/formatDate"
import { getEllipsisText } from "@/shared/utils/getEllipsisText"
import { Text } from "@/shared/ui"

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
                        <Text color="var(--whiteText)" size={12} className={styles.duration}>
                            {formatDuration(video.duration)}
                        </Text>
                        
                        {video.isShort && (
                            <Text color="var(--whiteText)" size={12} className={styles.shortsBadge}>
                                SHORTS
                            </Text>
                        )}
                    </div>

                    <div className={styles.info}>
                        <div className={styles.header}>
                            <Text className={styles.title}>
                                {getEllipsisText(video.name, 90)}
                            </Text>
                            {/* <button className={styles.menuButton}>
                                че это
                            </button> */}
                        </div>
                        
                        <Text weight={400} size={14} className={styles.channelName}>
                            {video.channel.name}
                        </Text>
                        
                        <div className={styles.metadata}>
                            <Text weight={400} size={14}>{formatViews(video.viewersCount)} просмотров</Text>
                            <div>•</div>
                            <Text weight={400} size={14}>{formatDate(video.datePublication || '')}</Text>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}