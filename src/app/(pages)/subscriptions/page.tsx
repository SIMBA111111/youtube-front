import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { Subs } from "@/widgets";
import styles from "./styles.module.scss";

export default async function Subscriptions() {

  const videoList = await getVideoListBySubs({onlyFull: false, onlyShorts: false})

  return (
    <div className={styles.mainPage__container}>
      <Subs videoList={videoList} />
    </div>
  );
}
