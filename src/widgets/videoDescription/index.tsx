import React from "react"
import { IChannel } from "@/entities/channels/modal/types"
import styles from './styles.module.scss'
import { EllipsisText, Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { formatDate } from "@/shared/utils/formatDate"

interface IVideoDescription {
    id: string
    name: string
    viewersCount: number
    channel: IChannel
    datePublication?: string
    videoDescription: string
    hashtags: string
    likeCount: number
    dislikeCount: number
    subscribersCount: number
    isSubscribed: boolean
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
    subscribersCount,
    isSubscribed
}) => {

    return (
        <div className={styles.description}>
            <div className={styles.channel}>
                <img src={channel.avatarUrl} alt="avatarUrl" className={styles.channel_img}/>
                <div className={styles.channelInfo}>
                    <Text className={styles.channelInfo_name}>{channel.name}</Text>
                    <Text size={12} weight={400}>{formatViews(subscribersCount)} подписчиков</Text>
                </div>
                <button className={styles.channel_btn}>
                    {isSubscribed ? 
                        <Text className={styles.channle_btn_text} color="var(--whiteText)">Отписаться</Text> 
                        : 
                        <Text className={styles.channle_btn_text} color="var(--whiteText)">Подписаться</Text>
                    }
                </button>
            </div>
            
            <div className={styles.rating}>
                <div className={styles.rating_likeDislike}>
                    <div className={styles.rating_like}>
                        <Svg name="like"/>
                        <Text weight={400}>{formatViews(likeCount)}</Text>
                    </div>
                    <div className={styles.rating_divider}></div>
                    <div className={styles.rating_dislike}>
                        <Svg name="dislike"/>
                        <Text weight={400}>{formatViews(dislikeCount)}</Text>
                    </div>

                </div>
                <div className={styles.rating_share}>
                    <Svg name="share"/>
                    <Text weight={400}>Поделиться</Text>
                </div>

                <div className={styles.rating_settings}>
                    <Svg name="verticalEllipsis"/>
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