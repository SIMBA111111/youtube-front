// app/creator/channel/page.tsx
import { cookies } from "next/headers";
import { ContentWidget } from "@/widgets/creator";
import styles from "./styles.module.scss";
import { EditingWidget } from "@/widgets/creator/EditingWidget";
import { getChannelInfoByUsername } from "@/shared/api/channels/getChannelInfo";
import { getChannelInfoById } from "@/shared/api/channels/getChannelInfoById";

export default async function CreatorChannel({
  params,
}: {
  params: Promise<{ channelId: string }>
}) {
  const {channelId} = await params
  const cookieStore = await cookies()
  const userData = JSON.parse(cookieStore.get('channelData')?.value || '{}')
  const jwt = cookieStore.get('jwt')?.value 

  const channelData = await getChannelInfoById(channelId)

  return (
    <div className={styles.page}>
      <h1>Настройки канала</h1>
      <div className={styles.page}>
        <EditingWidget channelData={channelData.channel}/>
      </div>
    </div>
  );
}