"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Svg } from "@/shared/ui";
import { getShortVideos } from "@/shared/api/video/getShortVideos";
import { ShortPlayer } from "@webitch/short-player";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ShortVideoBtns } from "@/features/shortVideoActions/ui";
import { getVideos } from "@/shared/api/video/getVideoList";
import styles from "./styles.module.scss";


export const ShortsSwiper = ({ videos, videoId, myChannelData }: { videos: IVideo[], videoId: string, myChannelData: any }) => {
  const swiperRef = useRef(null);
  const currentItemRef = useRef(1);
  const [shortVideos, setShortVideos] = useState(videos);
  const theme = Cookie.get("theme");

  const handleIncrementCounter = async (swiper) => {
    currentItemRef.current = swiper.activeIndex;

    if (currentItemRef.current > shortVideos.length - 5) {
      const res = await getVideos();
      setShortVideos((prev: IVideo[]) => [...prev, ...res.videos]);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getVideos();
      setShortVideos((prev: IVideo[]) => [...prev, ...res.videos]);
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

  console.log('videos = ', shortVideos);

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
                <ShortPlayer
                  duration={video.duration}
                  playlistUrl={video.masterM3u8Url}
                  // theme={theme}
                />
                <ShortVideoBtns 
                  commentsCount={video.commentsCount || 0} 
                  dislikeCount={video.dislikeCount || 0} 
                  likeCount={video.likeCount || 0} 
                  videoId={videoId} 
                  me={myChannelData}
                  
                />
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
