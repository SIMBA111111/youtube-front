'use client'

import Link from "next/link";

import { Svg, Text } from "@/shared/ui";
import { HorizontalCollaps, HorizontalCollapsBody, HorizontalCollapsHeader} from "@/shared/ui/HorizontalCollaps";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { getVideosCount } from "@/shared/utils/getVideosCount";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getShortsCount } from "@/shared/utils/getShortsCount";
import { ThumbnailShortVideoCard } from "@/entities";
import styles from "./styles.module.scss";

export const Subs = ({videoList} : {videoList: IVideo[]}) => {

  const device = useDeviceIsMobile()

  return (
    <div className={styles.mainPage__container}>

      <div className={styles.header}>
        <Text size={20} weight={500}>Самые актуальные</Text>
        <Link href={'/subscriptions/channels'} className={styles.channels}><Text weight={500}>Каналы, на которые вы подписаны</Text></Link>      
      </div>

      <HorizontalCollaps>
        <HorizontalCollapsHeader>
          <div className={styles.videoGrid}>
            {videoList
                .filter((video: IVideo) => !video.isShort)
                .slice(0, getVideosCount(device))
                .map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
            ))}
          </div>
        </HorizontalCollapsHeader>
        <HorizontalCollapsBody>
          <div className={styles.videoGrid}>
            {videoList
                .filter((video: IVideo) => !video.isShort) 
                .map((video: IVideo) => (
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard video={video} />
                    </div>
            ))}
          </div>
        </HorizontalCollapsBody>
      </HorizontalCollaps>

      <div className={styles.shorts}>
        <div className={styles.shortsTag}>
            <Svg name='shortsRed'/>
            <Text size={20}>Shorts</Text>
        </div>
        <Link href={'/subscriptions/shorts'} className={styles.shortsLink}>Посмотреть все</Link>
      </div>
      
      <div className={styles.videoGridHorts}>
          {videoList
              .filter((video: IVideo) => video.isShort) 
              .slice(0, getShortsCount(device))
              .map((video: IVideo) => (
                  <div key={video.id} className={styles.hortsVideoCardWrapper}>
                      <ThumbnailShortVideoCard {...video} />
                  </div>
              ))}
      </div>
      <div className={styles.videoGrid}>
        {videoList
            .filter((video: IVideo) => !video.isShort) 
            .map((video: IVideo) => (
                <div key={video.id} className={styles.videoCardWrapper}>
                    <ThumbnailVideoCard video={video} />
                </div>
        ))}
      </div>
    </div>
  );
}
