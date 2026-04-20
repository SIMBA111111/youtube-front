import { Text } from "@/shared/ui";
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";
import { IChannel } from "@/entities/channels/modal/types";
import { ChannelCard } from "@/entities/channels/ui";

import styles from "./styles.module.scss";


export default async function SubsChannels() {

  const channelList = await getMySubsChannels()

  return (
    <div className={styles.mainPage__container}>
      <Text size={24} weight={700}>Каналы, на которые вы подписаны</Text>

      <div className={styles.channelList}>
        {channelList.map((channel: IChannel) => (
          <ChannelCard 
            id={channel.id} 
            name={channel.name} 
            username={channel.username} 
            avatarUrl={channel.avatarUrl} 
            description={channel.description} 
            subscribersCount={channel.subscribersCount} 
            notificationSetting={channel.notificationSetting} 
          />
        ))}
      </div>


    </div>
  );
}
