// app/creator/channel/page.tsx
import { cookies } from "next/headers";
import { EditingWidget } from "@/widgets/creator/EditingWidget";
import { getChannelInfoById } from "@/shared/api/channels/getChannelInfoById";
import styles from "./styles.module.scss";

export default async function CreatorChannel({
  params,
}: {
  params: Promise<{ channelId: string }>
}) {
  const {channelId} = await params
  const channelData = await getChannelInfoById(channelId)

  if (!channelData.data) {
    return (
      <div>
        Ошибка данных о канале
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1>Настройки канала</h1>
      <div className={styles.page}>
        <EditingWidget channelData={channelData.data}/>
      </div>
    </div>
  );
}