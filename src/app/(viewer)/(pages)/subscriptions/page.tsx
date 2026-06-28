import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { cookies } from "next/headers";
import { Subs } from "@/widgets";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import styles from "./styles.module.scss";

export default async function Subscriptions() {

  const cookie = await cookies()

  let channelData
  let meId
  let videoList

  if(cookie.get('channelData')) {
    channelData = JSON.parse(cookie.get('channelData')?.value || '') || {}
    meId = channelData.id || ''
    videoList = await getVideoListBySubs({meId: meId, limit: 20, offset: 0, onlyFull: false, onlyShorts: false})
  } else {
    return <UnauthorizedWidget svgName="channels" title="Тогда в этом разделе появятся новые видео с каналов, на которые вы подписаны."/>
  }

  return (
    <div className={styles.mainPage__container}>
      <Subs videoList={videoList.videos} />
    </div>
  );
}
