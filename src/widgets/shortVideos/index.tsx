"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Svg, Text } from "@/shared/ui";
import { getVideoById } from "@/shared/api/video/getVideoById";
import { EvaluateVideo } from "@/features/videoDescription/evaluateVideo/ui";
import { ShareVideo } from "@/features/videoDescription/shareVideo/ui";
import { CommentsVideo } from "@/features/videoDescription/commentsVideo/ui";
import { SubscribeButton } from "@/features";
import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { IShortVideoListItem } from "@/entities/thumbnailShortVideo/modal/types";
import styles from "./styles.module.scss";

const ShortPlayer = dynamic(
  () => import('@webitch/short-player'),
  { ssr: false }
);

export const ShortsSwiper = ({ videoId, myChannelData }: { videoId: string, myChannelData: any }) => {
  const swiperRef = useRef(null);
  const [shortVideos, setShortVideos] = useState<IShortVideoListItem[]>([]);
  const [currentShortVideo, setCurrentShortVideo] = useState(null);
  const theme = Cookie.get("theme");
  const pathname = usePathname()

  const handleIncrementCounter = async (swiper: SwiperClass) => {
    if(shortVideos.length === 0)
      return

    const resGetVideoById = await getVideoById(shortVideos[swiper.activeIndex].id);
    setCurrentShortVideo(resGetVideoById)

    if (swiper.activeIndex > shortVideos.length - 2) {
      const res = await getShortVideos();
      setShortVideos((prev: IShortVideoListItem[]) => [...prev, ...res.result]);
    }
  };

  useEffect(() => {
    (async () => {
      const resGetVideos = await getShortVideos();
      const resGetVideoById = await getVideoById(videoId);
      setCurrentShortVideo(resGetVideoById)
      setShortVideos((prev: IShortVideoListItem[]) => [...prev, ...resGetVideos.result]);
    })()
  }, [])

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  if (!shortVideos || shortVideos.length === 0 || !currentShortVideo) {
    return <div>...</div>
  }

  return (
    <div className={styles.mainPage__container}>
      <div className={styles.shortVideoWrapper}>
        <Swiper
          ref={swiperRef}
          direction="vertical"
          className={styles.swiper}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          modules={[Mousewheel, Pagination, Navigation]}
          touchStartPreventDefault={false}
          touchMoveStopPropagation={false}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          onSlideChange={(swiper) => handleIncrementCounter(swiper)}
        >
          {shortVideos.map((video, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.playerWrapper}>
                <div className={styles.channelInfo}>
                  <div className={styles.channelBtn}>
                    <img src={currentShortVideo?.channel?.avatar_url ?? '/defaultImages/defaultAvatar.png'} alt="image!" className={styles.channelAvatar}/>
                    <SubscribeButton 
                      channelId={currentShortVideo?.channel?.id} 
                      isSubscribed={currentShortVideo?.isSubscribed} 
                      meId={myChannelData.id} 
                      notificationSetting={currentShortVideo?.isSubscribed?.notification_settings || false}
                    />
                  </div>
                  <Text className={styles.videoDescription}>{currentShortVideo.video?.videoDescription}</Text>
                </div>

                {currentShortVideo.video.id === video.id ? (
                  <ShortPlayer
                    duration={currentShortVideo.video.duration}
                    playlistUrl={currentShortVideo.video.masterM3u8Url || ''}
                    index={video.id}
                  />
                ) : (
                  null
                )}
                <div className={styles.actionsPlayerWrapper}>
                  <EvaluateVideo
                    isLiked={currentShortVideo?.stat?.liked}
                    isDisliked={currentShortVideo?.stat?.disliked}
                    likeCount={currentShortVideo?.video?.likeCount}
                    dislikeCount={currentShortVideo?.video?.dislikeCount}
                    userId={myChannelData.id}
                    videoId={currentShortVideo?.video?.id}
                  />
                  <ShareVideo videoHash={currentShortVideo?.video?.id} isShort />
                  <CommentsVideo commentsCount={currentShortVideo?.video?.commentsCount} videoId={currentShortVideo?.video?.id} me={myChannelData}/>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navButtons}>
          <button
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={handlePrev}
            aria-label="Предыдущее видео"
          >
            <Svg name="arrowUp" />
          </button>

          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={handleNext}
            aria-label="Следующее видео"
          >
            <Svg name="arrowDown" />
          </button>
        </div>
      </div>
    </div>
  );
};
