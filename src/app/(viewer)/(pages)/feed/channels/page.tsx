import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";
import styles from "./styles.module.scss";

export default async function MySubsChannels() {

  const channelList = await getMySubsChannels()

  return (
    <div className={styles.mainPage__container}>

    </div>
  );
}
