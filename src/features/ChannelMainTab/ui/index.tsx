'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { IChannelCommunityPost } from "@/entities/communityPost/ui";
import { IPlaylist } from "@/entities/playlist/ui";
import styles from "./styles.module.scss";


interface IChannelMain {
    videoList: IVideo[],
    shortVideoList: IVideo[],
    communityPosts: IChannelCommunityPost[],
    playlists: IPlaylist[]
}

export const ChannelMainTab: React.FC<IChannelMain> = ({
    videoList,
    shortVideoList,
    communityPosts,
    playlists
}) => {

    return (
        <div className={styles.channelMain}>
            
            
        </div>
    )
}