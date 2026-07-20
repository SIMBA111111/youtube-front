import { cookies } from "next/headers";

import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailShortVideoSmallCard } from "@/entities/thumbnailShortVideo/ui/SmallCard";
import { Text } from "@/shared/ui";

import styles from "./styles.module.scss";
import { getChannelData } from "@/shared/utils/getChannelData";


export default async function Subscriptions() {
  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  const videoList = await getVideoListBySubs({meId: myChannelData.id, limit: 20, offset: 0, onlyFull: false, onlyShorts: false})

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
