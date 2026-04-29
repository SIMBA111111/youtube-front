'use client'

import { useState } from "react"
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

import { IChannel, ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";

import styles from "./styles.module.scss";


export interface IChannelCommunityPost {
    id: string
    channel: IChannel
    content: string
    images?: string[]
    video?: IVideo
    date_publish: string
    likesCount: number
    commentsCount: number
}

export const ChannelCommunityPost: React.FC<IChannelCommunityPost> = ({
    id,
    channel,
    content,
    images,
    video,
    date_publish,
    likesCount,
    commentsCount
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(likesCount);

    const formatDate = (date: string) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
    };

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className={styles.communityPost}>
            {/* Шапка поста */}
            <div className={styles.postHeader}>
                <img src={channel?.avatarUrl} alt={channel?.name} />
                <div className={styles.postAuthor}>
                    <Text className={styles.authorName}>{channel?.name}</Text>
                    <Text className={styles.postDate}>{formatDate('2026-04-04T12:12:12')}</Text>
                </div>
                <button className={styles.menuButton}>
                    <Svg name="dots" width={20} height={20} />
                </button>
            </div>

            {/* Контент поста */}
            <div className={styles.postContent}>
                <Text className={styles.postText}>{content}</Text>
                
                {/* Изображения */}
                {images && images.length > 0 && (
                    <div className={`${styles.postImages} ${images.length === 1 ? styles.singleImage : styles.multipleImages}`}>
                        {images.map((image, index) => (
                            <div key={index} className={styles.imageWrapper}>
                                <img src={image} alt={`post image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Видео */}
                {video && (
                    <div className={styles.postVideo}>
                        <img src={video.previewUrl} alt={video.name} />
                        <div className={styles.videoOverlay}>
                            <Svg name="play"/>
                        </div>
                        <div className={styles.videoInfo}>
                            <Text className={styles.videoTitle}>{video.name}</Text>
                            <Text className={styles.videoViews}>{video.viewersCount} просмотров</Text>
                        </div>
                    </div>
                )}
            </div>

            {/* Действия с постом */}
            <div className={styles.postActions}>
                <button 
                    className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
                    onClick={handleLike}
                >
                    <Svg name={isLiked ? "like" : "like"}/>
                    <Text>{likes}</Text>
                </button>
                <button className={styles.actionButton}>
                    <Svg name="comment" />
                    <Text>{commentsCount}</Text>
                </button>
                <button className={styles.actionButton}>
                    <Svg name="share" />
                </button>
            </div>
        </div>
    )
}