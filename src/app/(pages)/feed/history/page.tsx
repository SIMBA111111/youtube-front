import { Text } from "@/shared/ui";
import { History } from "@/widgets/feed/history";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { HistorySettings } from "@/features/HistorySettings/ui";
import { cookies } from "next/headers";
import styles from "./styles.module.scss";


export default async function HistoryPage() {
  const cookie = await cookies()

  let meId
  let jwt

  if(cookie.get('channelData')) {
      meId = JSON.parse(cookie.get('channelData')?.value || '').id
      jwt = cookie.get('jwt')?.value
  }

  const videos = await getHistoryVideos(meId, jwt)

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>История просмотра</Text>

      <div className={styles.mainPage_body}>
        <div className={styles.mainPage_body_videos}>
          <History initVideos={videos.viewsHistory} userId={meId} jwt={jwt}/>
        </div>
        <div className={styles.mainPage_body_settings}>
          <HistorySettings />
        </div>
      </div>
    </div>
  );
}
