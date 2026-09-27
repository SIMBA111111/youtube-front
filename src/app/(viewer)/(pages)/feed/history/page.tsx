import { cookies } from "next/headers";

import { Text } from "@/shared/ui";
import { History } from "@/widgets/feed/history";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { HistorySettings } from "@/features/HistorySettings/ui";
import { getTags } from "@/shared/api/tags/getTags";
import { HISTORY_TAGS, THISTORY_TAGS } from "@/shared/constants/tags";
import { getMe } from "@/shared/api/me/getMe";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import { getChannelData } from "@/shared/utils/getChannelData";
import { ITagEntity } from "@/entities/videoTags/model";

import styles from "./styles.module.scss";


export default async function HistoryPage() {
  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  let jwt
  // let videos
  let myChannel

  if(myChannelData) {
    jwt = cookie.get('jwt')?.value || ''
    // videos = await getHistoryVideos(myChannelData?.id, jwt)
    myChannel = await getMe(jwt, myChannelData?.id)
  } else {
    return (
      <UnauthorizedWidget svgName="history" title="Чтобы посмотреть историю просмотра, войдите в аккаунт." />
    )
  }

  const tags = await getTags('')

  if (
    !tags?.data || 
    // !videos?.data || 
    !myChannel || 
    !myChannel.data) {
    return (
      <div>Ошибка...</div>
    )
  }
  
  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>История просмотра</Text>

      <div className={styles.mainPage_body}>
        <div className={styles.mainPage_body_videos}>
          <History
            // initVideos={videos.data}
            userId={myChannelData.id} 
            jwt={jwt} 
            tags={tags.data}
          />
        </div>
        <div className={styles.mainPage_body_settings}>
          <HistorySettings meId={myChannelData.id} isSaveHistory={myChannel.data.isSaveHistory}/>
        </div>
      </div>
    </div>
  );
}
