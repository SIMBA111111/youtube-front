import { cookies } from "next/headers";

import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailShortVideoSmallCard } from "@/entities/thumbnailShortVideo/ui/SmallCard";
import { Text } from "@/shared/ui";

import styles from "./styles.module.scss";


export default async function Subscriptions() {

  const cookie = await cookies()

  const channelData = JSON.parse(cookie.get('channelData')?.value || '') || {}
  const meId = channelData.id || ''
  const videoList = await getVideoListBySubs({meId: meId, limit: 20, offset: 0, onlyFull: false, onlyShorts: false})

  return (
    <div className={styles.mainPage__container}>
       <Text size={20} color="var(--blackText)" weight={600}>Shorts</Text>

      <div className={styles.videoGridHorts}>
        {videoList.videos
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
