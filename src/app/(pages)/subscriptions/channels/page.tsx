import { cookies } from "next/headers";

import { Text } from "@/shared/ui";
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";
import { IChannel } from "@/entities/channels/modal/types";
import { ChannelCard } from "@/entities/channels/ui";

import styles from "./styles.module.scss";


export default async function SubsChannels() {
  const cookie = await cookies()

  let meId
  let jwt

  if(cookie.get('channelData')) {
      meId = JSON.parse(cookie.get('channelData')?.value || '').id
      jwt = cookie.get('jwt')?.value
  }
''

  const channelList = await getMySubsChannels(meId)

  console.log('channelList = ', channelList);
  

  return (
    <div className={styles.mainPage__container}>
      <Text size={24} weight={700}>Каналы, на которые вы подписаны</Text>

      <div className={styles.channelList}>
        {channelList.channels.map((channel: IChannel) => (
          <ChannelCard 
            id={channel.id} 
            name={channel.name} 
            username={channel.username} 
            avatarUrl={channel.avatar_url} 
            description={channel.description} 
            subscribersCount={channel.subscribersCount} 
            notificationSetting={channel.notificationSetting} 
          />
        ))}
      </div>


    </div>
  );
}
