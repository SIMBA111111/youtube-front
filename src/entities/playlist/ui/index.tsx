'use client'

import { Text } from "@/shared/ui";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { IPlaylistEntity } from "../model/types";
import styles from "./styles.module.scss";


interface IPlaylist {
    playlist: IPlaylistEntity
}

export const Playlist: React.FC<IPlaylist> = ({
    playlist
}) => {

    const formatDate = (date: string) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
    };

    return (
        <div className={styles.playlistCard}>
            <div className={styles.playlistThumbnail}>
                <img src={playlist.thumbnailUrl} alt={playlist.name} />
                <div className={styles.playlistOverlay}>
                    {/* <div className={styles.playlistIcon}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div> */}
                    <Text size={12} color="var(--whiteText)" className={styles.videoCount}>{playlist.videoCount} видео</Text>
                </div>
            </div>
            <div className={styles.playlistInfo}>
                <Text size={14} className={styles.text}>{playlist.name}</Text>
                <Text size={12} color="var(--gray)" className={styles.text}>Обновлен {formatDate('2026-04-04T12:12:12')}</Text>
                <Text size={12} color="var(--descriptionText)" weight={500} className={styles.text}>Посмотреть весь плейлист</Text>
            </div>
        </div>
    )
}