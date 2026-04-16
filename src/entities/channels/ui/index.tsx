import { formatViews } from "@/shared/utils/formatViews";
import { IChannel } from "../modal/types";
import styles from "./styles.module.scss";
import { Text } from "@/shared/ui";
import { SubscribeButton } from "@/features";

export const ChannelCard: React.FC<IChannel> = ({
    id,
    name,
    username,
    avatarUrl,
    description,
    subscribersCount,
    notificationSetting
}) => {
    return (
        <div className={styles.channelCard}>
            <img src={avatarUrl} alt="avatarUrl" className={styles.avatar}/>
            <div className={styles.info}>
                <Text>{name}</Text>
                <Text color="(var--gray)">{username} {formatViews(subscribersCount || 0)} подписчиков</Text>
                <Text color="(var--gray)" className={styles.description}>{description}</Text>
            </div>
            <SubscribeButton isSubscribed notificationSetting={notificationSetting}/>
        </div>
    )
}