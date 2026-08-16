// app/creator/channel/page.tsx
import { cookies } from "next/headers";
import { ContentWidget } from "@/widgets/creator";
import styles from "./styles.module.scss";
import { getChannelData } from "@/shared/utils/getChannelData";

export default async function CreatorChannel() {
  const cookieStore = await cookies()
  const userData = await getChannelData(cookieStore)
  const jwt = cookieStore.get('jwt')?.value || ''

  if (!userData) {
    return
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Контент на канале</h1>
      <div className={styles.page}>
        <ContentWidget 
          channelId={userData.id}
          jwt={jwt}
          channelUsername={userData.username}
        />
      </div>
    </div>
  );
}