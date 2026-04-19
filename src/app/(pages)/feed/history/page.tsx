import { Text } from "@/shared/ui";
import styles from "./styles.module.scss";
import { getVideos } from "@/shared/api/video/getVideoList";
import { History } from "@/widgets/feed/history";
import { getHistoryVideos } from "@/shared/api/video/getHistoryVideos";

export default async function HistoryPage() {

  const videos = await getHistoryVideos()

  return (
    <div className={styles.mainPage__container}>
      <Text size={36} color="var(--blackText)" weight={600}>История просмотра</Text>

      <div>
        <History initVideos={videos} />
      </div>
    </div>
  );
}
