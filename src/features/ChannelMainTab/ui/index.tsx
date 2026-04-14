'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";

import styles from "./styles.module.scss";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";


interface IChannelMain {
    videoList: IVideo[],
    shortVideoList: IVideo[],
    communityPosts: ICommunityPost[],
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