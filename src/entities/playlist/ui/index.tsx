'use client'

import { IChannel } from "@/entities/channels/modal/types"
import { IVideo } from "@/entities/thumbnailVideo/modal/types";

import styles from "./styles.module.scss";
import { Text } from "@/shared/ui";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export interface IPlaylist {
    playlistPreview: string
    playlistName: string
    channel: IChannel
    createdAt: string
    updatedAt: string
    videos: IVideo[]
}

export const Playlist: React.FC<IPlaylist> = ({
    playlistPreview,
    playlistName,
    channel,
    createdAt,
    updatedAt,
    videos
}) => {

    const formatDate = (date: string) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
    };

    return (
        <div className={styles.playlistCard}>
            <div className={styles.playlistThumbnail}>
                <img src={playlistPreview} alt={playlistName} />
                <div className={styles.playlistOverlay}>
                    {/* <div className={styles.playlistIcon}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div> */}
                    <Text size={12} color="var(--whiteText)" className={styles.videoCount}>{videos?.length} видео</Text>
                </div>
            </div>
            <div className={styles.playlistInfo}>
                <Text size={14} className={styles.text}>{playlistName}</Text>
                <Text size={12} color="var(--gray)" className={styles.text}>Обновлен {formatDate('2026-04-04T12:12:12')}</Text>
                <Text size={12} color="var(--descriptionText)" weight={500} className={styles.text}>Посмотреть весь плейлист</Text>
            </div>
        </div>
    )
}