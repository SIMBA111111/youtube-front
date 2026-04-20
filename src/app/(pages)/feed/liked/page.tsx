import { Text } from "@/shared/ui";
import styles from "./styles.module.scss";
import { Liked } from "@/widgets/feed/liked";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";

export default async function LikedPage() {

  const videos = await getLikedVideos()
  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>Понравившиеся</Text>

      <Liked initVideos={videos} />
    </div>
  );
}
