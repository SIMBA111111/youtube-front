'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";

import styles from "./styles.module.scss";
import { IChannelCommunityPost } from "@/entities/communityPost/ui";


interface IChannelCommunity {
    communityPosts: IChannelCommunityPost[]
}

export const ChannelCommunity: React.FC<IChannelCommunity> = ({
    communityPosts
}) => {

    return (
        <div className={styles.channelCommunity}>
            сообщство
        </div>
    )
}