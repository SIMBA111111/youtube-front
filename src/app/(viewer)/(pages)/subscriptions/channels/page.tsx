import { cookies } from "next/headers";

import { Text } from "@/shared/ui";
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";
import { IChannel } from "@/entities/channels/modal/types";
import { ChannelCard } from "@/entities/channels/ui";

import styles from "./styles.module.scss";
import { MySubChannels } from "@/widgets/mySubChannels";


export default async function SubsChannels() {
  const cookie = await cookies()

  let meId
  let jwt

  if(cookie.get('channelData')) {
      meId = JSON.parse(cookie.get('channelData')?.value || '').id
      jwt = cookie.get('jwt')?.value
  }

  return (
    <div className={styles.mainPage__container}>
      <Text size={32} weight={700}>Каналы, на которые вы подписаны</Text>
      <MySubChannels jwt={jwt || ''} userId={meId} />
    </div>
  );
}
