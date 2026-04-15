import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { Subs } from "@/widgets";
import styles from "./styles.module.scss";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailShortVideoCard } from "@/entities";
import { ThumbnailShortVideoSmallCard } from "@/entities/thumbnailShortVideo/ui/SmallCard";
import { Text } from "@/shared/ui";

export default async function Subscriptions() {

  const videoList = await getVideoListBySubs({onlyShorts: true, onlyFull: false})

  return (
    <div className={styles.mainPage__container}>
       <Text size={20} color="var(--blackText)" weight={600}>Shorts</Text>

      <div className={styles.videoGridHorts}>
        {videoList
            .filter((video: IVideo) => video.isShort) 
            .map((video: IVideo) => (
                <div key={video.id} className={styles.hortsVideoCardWrapper}>
                    <ThumbnailShortVideoSmallCard {...video} />
                </div>
        ))}
      </div>
    </div>
  );
}
