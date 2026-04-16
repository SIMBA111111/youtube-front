'use client'

import { ChannelCommunityPost, IChannelCommunityPost } from "@/entities/communityPost/ui";
import styles from "./styles.module.scss";


interface IChannelCommunity {
    communityPosts: IChannelCommunityPost[]
}

export const ChannelCommunity: React.FC<IChannelCommunity> = ({
    communityPosts
}) => {
    return (
        <div className={styles.channelCommunity}>
            {communityPosts.map((post: IChannelCommunityPost) => 
                <ChannelCommunityPost key={post.id} channel={post.channel} commentsCount={post.commentsCount} content={post.content} date_publish={post.date_publish} images={post.images} video={post.video} likesCount={post.likesCount}/>
            )}
        </div>
    )
}