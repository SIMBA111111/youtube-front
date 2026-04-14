'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";

import styles from "./styles.module.scss";
import { ChannelCommunityPost, IChannelCommunityPost } from "@/entities/communityPost/ui";


interface IChannelCommunity {
    communityPosts: IChannelCommunityPost[]
}

export const ChannelCommunity: React.FC<IChannelCommunity> = ({
    communityPosts
}) => {

    console.log('communityPosts = ', communityPosts);
    

    return (
        <div className={styles.channelCommunity}>
            {communityPosts.map((post: IChannelCommunityPost) => 
                <ChannelCommunityPost key={post.id} channel={post.channel} commentsCount={post.commentsCount} content={post.content} date_publish={post.date_publish} images={post.images} video={post.video} likesCount={post.likesCount}/>
            )}
        </div>
    )
}