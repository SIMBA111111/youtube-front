"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { usePathname } from "next/navigation";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Svg, Text } from "@/shared/ui";
import { ShortPlayer } from "@webitch/short-player";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { getVideos } from "@/shared/api/video/getVideoList";
import { getVideoById } from "@/shared/api/video/getVideoById";
import { EvaluateVideo } from "@/features/videoDescription/evaluateVideo/ui";
import { ShareVideo } from "@/features/videoDescription/shareVideo/ui";
import { CommentsVideo } from "@/features/videoDescription/commentsVideo/ui";
import { SubscribeButton } from "@/features";
import styles from "./styles.module.scss";


export const ShortsSwiper = ({ videos, videoId, myChannelData }: { videos: IVideo[], videoId: string, myChannelData: any }) => {
  const swiperRef = useRef(null);
  const currentItemRef = useRef(1);
  const [shortVideos, setShortVideos] = useState(videos);
  const [currentShortVideo, setCurrentShortVideo] = useState({});
  const theme = Cookie.get("theme");
  const pathname = usePathname()

  const handleIncrementCounter = async (swiper: SwiperClass) => {
    currentItemRef.current = swiper.activeIndex;
    const resGetVideoById = await getVideoById(shortVideos[currentItemRef.current].id);
    setCurrentShortVideo(resGetVideoById)

    if (currentItemRef.current > shortVideos.length - 5) {
      const res = await getVideos();
      setShortVideos((prev: IVideo[]) => [...prev, ...res.videos]);
    }
  };

  useEffect(() => {
    (async () => {
      const resGetVideos = await getVideos();
      const resGetVideoById = await getVideoById(videoId);
      setCurrentShortVideo(resGetVideoById)
      setShortVideos((prev: IVideo[]) => [...prev, ...resGetVideos.videos]);
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


  if (!shortVideos || shortVideos.length === 0) {
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
                <ShortPlayer
                  duration={video.duration}
                  playlistUrl={video.masterM3u8Url}
                  theme={theme}
                 />
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
