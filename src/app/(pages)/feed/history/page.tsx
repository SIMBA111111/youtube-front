import { Text } from "@/shared/ui";
import { History } from "@/widgets/feed/history";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { HistorySettings } from "@/features/HistorySettings/ui";
import styles from "./styles.module.scss";

export default async function HistoryPage() {

  const videos = await getHistoryVideos()

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>История просмотра</Text>

      <div className={styles.mainPage_body}>
        <div className={styles.mainPage_body_videos}>
          <History initVideos={videos} />
        </div>
        <div className={styles.mainPage_body_settings}>
          <HistorySettings />
        </div>
      </div>
    </div>
  );
}
