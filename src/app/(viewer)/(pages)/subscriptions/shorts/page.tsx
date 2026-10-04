import { cookies } from "next/headers";

import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { IVideoEntity, IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { ThumbnailShortVideoSmallCard } from "@/entities/thumbnailShortVideo/ui/SmallCard";
import { Text } from "@/shared/ui";
import { getChannelData } from "@/shared/utils/getChannelData";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";

import styles from "./styles.module.scss";


export default async function Subscriptions() {
  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  if(!myChannelData) {
    return (
      <UnauthorizedWidget svgName="history" title="Чтобы посмотреть видео, войдите в аккаунт." />
    )
  }

  const videoList = await getVideoListBySubs({meId: myChannelData.id, limit: 20, offset: 0, onlyFull: false, onlyShorts: true})

  if (!videoList || !videoList.data || videoList.error) {
    return (
      <div>
        Нет коротких видео
      </div>
    )
  }

  console.log('videoList: ', videoList);
  

  return (
    <div className={styles.mainPage__container}>
       <Text size={20} color="var(--blackText)" weight={600}>Shorts</Text>

      <div className={styles.videoGridHorts}>
        {videoList.data
          .map((video: IVideoFullInfo) => (
            <div key={video.video.id} className={styles.hortsVideoCardWrapper}>
                <ThumbnailShortVideoSmallCard video={video}/>
            </div>
        ))}
      </div>
    </div>
  );
}
