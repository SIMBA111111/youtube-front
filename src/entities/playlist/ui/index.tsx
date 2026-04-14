'use client'

import { IChannel } from "@/entities/channels/modal/types"
import { IVideo } from "@/entities/thumbnailVideo/modal/types";

import styles from "./styles.module.scss";
import { Text } from "@/shared/ui";


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

    return (
        <div className={styles.playlist}>
            <div className={styles.playlist}>
                <img src={playlistPreview} alt="" />
                <Text className={styles.playlist_videoCount}>{videos.length}</Text>
            </div>
            <div className={styles.playlist_info}>
                <Text>{playlistName}</Text>
                <Text>{channel.name} Плейлист</Text>
            </div>
        </div>
    )
}