import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { Subs } from "@/widgets";
import styles from "./styles.module.scss";
import { cookies } from "next/headers";

export default async function Subscriptions() {

  const cookie = await cookies()

  const channelData = JSON.parse(cookie.get('channelData')?.value || '') || {}
  const meId = channelData.id || ''

  const videoList = await getVideoListBySubs({meId: meId, limit: 20, offset: 0, onlyFull: false, onlyShorts: false})

  return (
    <div className={styles.mainPage__container}>
      <Subs videoList={videoList.videos} />
    </div>
  );
}
