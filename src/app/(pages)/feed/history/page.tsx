import { Text } from "@/shared/ui";
import styles from "./styles.module.scss";
import { getVideos } from "@/shared/api/video/getVideoList";
import { History } from "@/widgets/feed/history";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";
import { HistorySettings } from "@/features/HistorySettings/ui";

export default async function HistoryPage() {

  const videos = await getHistoryVideos()

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>История просмотра</Text>

      <div className={styles.mainPage_body}>
        <History initVideos={videos} />
        <HistorySettings />
      </div>
    </div>
  );
}
