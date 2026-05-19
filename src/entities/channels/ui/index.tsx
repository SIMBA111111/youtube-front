import Link from "next/link";

import { formatViews } from "@/shared/utils/formatViews";
import { IChannel } from "../modal/types";
import { Text } from "@/shared/ui";
import { SubscribeButton } from "@/features";

import styles from "./styles.module.scss";


export const ChannelCard: React.FC<IChannel & { meId: string}> = ({
    id,
    name,
    username,
    avatarUrl,
    description,
    subscribersCount,
    notificationSetting,
    meId
}) => {
    return (
        <Link href={`/channel/${username}`}>
        <div className={styles.channelCard}>
            <img src={avatarUrl} alt="avatarUrl" className={styles.avatar}/>
            <div className={styles.info}>
                <Text className={styles.name}>{name}</Text>
                <Text color="var(--descriptionText)" className={styles.username}>{username} {formatViews(subscribersCount || 0)} подписчиков</Text>
                <Text color="var(--descriptionText)" className={styles.description}>{description}</Text>
            </div>
            <SubscribeButton isSubscribed notificationSetting={notificationSetting} channelId={id} meId={meId}/>
        </div>
        </Link>
    )
}