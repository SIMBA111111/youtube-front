import { cookies } from "next/headers";
import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { Subs } from "@/widgets";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import { getChannelData } from "@/shared/utils/getChannelData";
import styles from "./styles.module.scss";

export default async function Subscriptions() {
  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  let meId
  let videoList

  if(myChannelData) {
    meId = myChannelData.id || ''
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
