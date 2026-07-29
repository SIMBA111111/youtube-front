"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Spinner, Svg, Text } from "@/shared/ui";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleSlideChange = async (swiper: SwiperClass) => {
    const newIndex = swiper.activeIndex;
    setActiveIndex(newIndex);
    
    if (shortVideos.length === 0 || !shortVideos[newIndex]) return;

    // Загружаем данные для нового видео
    const resGetVideoById = await getVideoById(shortVideos[newIndex].id);
    setCurrentShortVideo(resGetVideoById);

    if (newIndex > shortVideos.length - 2) {
      const res = await getShortVideos();
      setShortVideos((prev: IShortVideoListItem[]) => [...prev, ...res.result]);
    }
  };

  useEffect(() => {
    (async () => {
      const resGetVideos = await getShortVideos();
      const resGetVideoById = await getVideoById(videoId);
      setCurrentShortVideo(resGetVideoById);
      setShortVideos((prev: IShortVideoListItem[]) => [...prev, ...resGetVideos.result]);
      setIsInitialized(true);
    })();
  }, [videoId]);

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

  if (!isInitialized || !shortVideos.length || !currentShortVideo) {
    return <div>Loading...</div>;
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
          onSlideChange={handleSlideChange}
        >
          {shortVideos.map((video, index) => (
            <SwiperSlide key={video.id} className={styles.slide}>
              {({ isActive }) => (
                <div className={styles.playerWrapper}>
                  <div className={styles.channelInfo}>
                    <div className={styles.channelBtn}>
                      <img 
                        src={currentShortVideo?.channel?.avatar_url ?? '/defaultImages/defaultAvatar.png'} 
                        alt="avatar" 
                        className={styles.channelAvatar}
                      />
                      <SubscribeButton 
                        channelId={currentShortVideo?.channel?.id} 
                        isSubscribed={currentShortVideo?.isSubscribed} 
                        meId={myChannelData.id} 
                        notificationSetting={currentShortVideo?.isSubscribed?.notification_settings || false}
                      />
                    </div>
                    <Text className={styles.videoDescription}>{currentShortVideo.video?.videoDescription}</Text>
                  </div>

                  {/* Рендерим плеер только для активного слайда */}
                  {isActive && (
                          <ShortPlayer
                          key={`player-${currentShortVideo.video.id}`}
                          duration={currentShortVideo.video.duration}
                          playlistUrl={currentShortVideo.video.masterM3u8Url || ''}
                        />
                  )}

                  {!isActive && (
                    <div className={styles.playerPlaceholder} />
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
                    <CommentsVideo 
                      commentsCount={currentShortVideo?.video?.commentsCount} 
                      videoId={currentShortVideo?.video?.id} 
                      me={myChannelData}
                    />
                  </div>
                </div>
              )}
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