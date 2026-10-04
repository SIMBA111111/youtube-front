import { cookies } from "next/headers";

import { Text } from "@/shared/ui";
import { History } from "@/widgets/feed/history";
import { HistorySettings } from "@/features/HistorySettings/ui";
import { getTags } from "@/shared/api/tags/getTags";
import { getMe } from "@/shared/api/me/getMe";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import { getChannelData } from "@/shared/utils/getChannelData";
import { HistoryProvider } from "@/widgets/historyProvider/historyProvider";

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
          <HistoryProvider 
            userId={myChannelData.id}
            jwt={jwt}
            tags={tags.data}
            isSaveHistory={myChannel.data.isSaveHistory}
          />
        </div>
      </div>
    </div>
  );
}
