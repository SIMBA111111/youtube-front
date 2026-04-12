import React from "react"
import { IChannel } from "@/entities/channels/modal/types"
import { EllipsisText, Popover, Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { formatDate } from "@/shared/utils/formatDate"
import { SubscribeButton } from "@/features"
import { EvaluateVideo } from "@/features/videoDescription/evaluateVideo/ui"
import { ShareVideo } from "@/features/videoDescription/shareVideo/ui"
import styles from './styles.module.scss'
import { SettingsVideo } from "@/features/videoDescription/settingsVideo/ui"

interface IVideoDescription {
    id: string
    name: string
    viewersCount: number
    channel: IChannel
    datePublication?: string
    videoDescription: string
    hashtags: string
    isLiked: string,
    isDisliked: string,
    likeCount: number
    dislikeCount: number
    subscribersCount: number
    isSubscribed: boolean
    videoHash: string
}

export const VideoDescription: React.FC<IVideoDescription> = ({
    id,
    name,
    viewersCount,
    channel,
    datePublication,
    videoDescription,
    hashtags,
    likeCount,
    dislikeCount,
    isLiked,
    isDisliked,
    subscribersCount,
    isSubscribed = true,
    videoHash
}) => {

    return (
        <div className={styles.description}>
            <div className={styles.channel}>
                <img src={channel.avatarUrl} alt="avatarUrl" className={styles.channel_img}/>
                <div className={styles.channelInfo}>
                    <Text className={styles.channelInfo_name}>{channel.name}</Text>
                    <Text size={12} weight={400}>{formatViews(subscribersCount)} подписчиков</Text>
                </div>
                <SubscribeButton isSubscribed={isSubscribed} notificationSetting={channel.notificationSetting}/>
            </div>
            
            <div className={styles.rating}>
                <EvaluateVideo 
                    isLiked={isLiked} 
                    isDisliked={isDisliked} 
                    likeCount={likeCount} 
                    dislikeCount={dislikeCount}
                />

                <ShareVideo videoHash={videoHash} />

                <div className={styles.rating_settings}>
                    <SettingsVideo videoHash={videoHash} />
                </div>
            </div>
            
            <div className={styles.videoDescription}>
                <div className={styles.videoDescription_info}>
                    <Text>{viewersCount} просмотров</Text>
                    <Text>{formatDate(datePublication)}</Text>
                    <div className={styles.hashTags}>
                        {hashtags.split(', ').map((hashtag: string, index: number) => {
                            return <Text key={index} color="var(--gray)">#{hashtag}</Text>
                        })}
                    </div>
                </div>
                <div className={styles.videoDescription_text}>
                    <EllipsisText text={videoDescription} symbolCount={210} />
                </div>
            </div>
        </div>
    ) 
}