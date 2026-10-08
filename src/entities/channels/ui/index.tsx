import Link from "next/link";

import { formatViews } from "@/shared/utils/formatViews";
import { IChannelEntity } from "../model/types";
import { Text } from "@/shared/ui";
import { SubscribeButton } from "@/features";

import styles from "./styles.module.scss";

interface IChannelCard {
    channel: IChannelEntity
}

export const ChannelCard: React.FC<IChannelCard & { meId: string}> = ({
    channel,
    meId
}) => {
    return (
        <div className={styles.channelCard}>
            <Link href={`/channel/${channel.username}`} className={styles.link}>
                <img src={channel.avatarUrl || ''} alt="avatarUrl" className={styles.avatar}/>
                <div className={styles.info}>
                    <Text className={styles.name}>{channel.name}</Text>
                    <Text color="var(--descriptionText)" className={styles.username}>{channel.username} {formatViews(channel.subscribersCount || 0)} подписчиков</Text>
                    <Text color="var(--descriptionText)" className={styles.description}>{channel.description}</Text>
                </div>
            </Link>
            <SubscribeButton isSubscribed notificationSetting={!!channel.notificationSetting} channelId={channel.id} meId={meId}/>
        </div>
    )
}