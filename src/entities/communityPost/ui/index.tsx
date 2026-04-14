'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";

import styles from "./styles.module.scss";


export interface IChannelCommunityPost {
    communityPostImage: string,
    text: string
    date_publish: string
}

export const ChannelCommunityPost: React.FC<IChannelCommunityPost> = ({

}) => {

    return (
        <div className={styles.channelCommunity}>
            сообщество
        </div>
    )
}