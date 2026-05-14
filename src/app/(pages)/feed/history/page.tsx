import { Text } from "@/shared/ui";
import { History } from "@/widgets/feed/history";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { HistorySettings } from "@/features/HistorySettings/ui";
import { cookies } from "next/headers";
import styles from "./styles.module.scss";
import { getTags } from "@/shared/api/tags/getTags";
import { HISTORY_TAGS } from "@/shared/constants/tags";
import { ITag } from "@/entities/videoTags/ui";
import { getMe } from "@/shared/api/me/getMe";


export default async function HistoryPage() {
  const cookie = await cookies()

  let meId
  let jwt

  if(cookie.get('channelData')) {
      meId = JSON.parse(cookie.get('channelData')?.value || '').id
      jwt = cookie.get('jwt')?.value
  }

  const videos = await getHistoryVideos(meId, jwt)
  const myChannel = await getMe(jwt, meId)

  console.log('myChannel = ', myChannel);
  
  
  const tags = await getTags()

  const filteredTags = tags.tags.filter((t: ITag) => HISTORY_TAGS.find((tag: ITag) => tag.name === t.name))

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>История просмотра</Text>

      <div className={styles.mainPage_body}>
        <div className={styles.mainPage_body_videos}>
          <History initVideos={videos.viewsHistory} userId={meId} jwt={jwt} tags={filteredTags}/>
        </div>
        <div className={styles.mainPage_body_settings}>
          <HistorySettings meId={meId} isSaveHistory={myChannel.meInfo.is_save_history}/>
        </div>
      </div>
    </div>
  );
}
