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
import { useRouter } from "next/navigation";


const ShortPlayer = dynamic(
  () => import('@webitch/short-player'),
  { ssr: false }
);

interface IPagination {
  offset: number
  limit: number
}

const PAGINATION_STEP = 5

export const ShortsSwiper = ({videos, initVideo, videoId, myChannelData }: {videos: IShortVideoListItem[], initVideo: any, videoId: string, myChannelData: any }) => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const isUpdatingRef = useRef(false); 
  const isActiveIndexRef = useRef(0); 
  const isFetchingRef = useRef(false);
  const [shortVideos, setShortVideos] = useState<IShortVideoListItem[]>(videos || []);
  const [currentShortVideo, setCurrentShortVideo] = useState(initVideo);
  const [pagination, setPagination] = useState<IPagination>({
    offset: 5,
    limit: 10
  });

  const handleSlideChange = async (swiper: SwiperClass) => {
    const newIndex = swiper.activeIndex;
    
    // Проверяем, что индекс действительно изменился
    if (newIndex === isActiveIndexRef.current) return;
    
    // isActiveIndexRef.current = newIndex
    
    if (shortVideos.length === 0 || !shortVideos[newIndex]) return;

    // Проверяем, что это видео еще не загружено
    const video = shortVideos[newIndex];
    if (currentShortVideo?.video?.id === video.id) return;
    
    // Добавляем флаг загрузки
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    
    try {
      router.replace(`/shorts/${video.id}`, { scroll: false });

      const resGetVideoById = await getVideoById(video.id);
      setCurrentShortVideo(resGetVideoById);


      if (newIndex > shortVideos.length - 2) {
        const res = await getShortVideos(pagination.offset, pagination.limit);
        setShortVideos((prev: IShortVideoListItem[]) => [...prev, ...res.result]);
        setPagination(prev => ({
          offset: prev.offset + PAGINATION_STEP,
          limit: prev.limit + PAGINATION_STEP,
        }));
      }
    } finally {
      isFetchingRef.current = false;
    }
  };

  // useEffect(() => {
    // setShortVideos(videos);
  // }, []);

  useEffect(() => {
    if (shortVideos.length > 0) {
      const initialIndex = shortVideos.findIndex(v => v.id === videoId);
      if (initialIndex !== -1 && swiperRef.current?.swiper) {
        swiperRef.current.swiper.slideTo(initialIndex, 0);
        isActiveIndexRef.current = initialIndex
      }
    }
  }, [shortVideos, videoId]);

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

  console.log('currentShortVideo: ', currentShortVideo);

  if (!shortVideos.length || !currentShortVideo) {
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
            mousewheel={{
              sensitivity: 0.1, // Уменьшаем для более плавного скролла
              thresholdDelta: 30, // Меньше = более чувствительный
              thresholdTime: 600, // Время между срабатываниями
              releaseOnEdges: true,
              invert: false,
              forceToAxis: true, // Принудительно по оси
          }}
          modules={[Mousewheel, Pagination, Navigation]}
          touchStartPreventDefault={false}
          touchMoveStopPropagation={false}
          onSlideChangeTransitionEnd={handleSlideChange}
        >
          {shortVideos.map((video, index) => (
            <SwiperSlide key={video.id} className={styles.slide}>
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

                  <ShortPlayer
                    key={`player-${currentShortVideo.video.id}`}
                    duration={currentShortVideo.video.duration}
                    playlistUrl={currentShortVideo.video.masterM3u8Url || ''}
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
                    <CommentsVideo 
                      commentsCount={currentShortVideo?.video?.commentsCount} 
                      videoId={currentShortVideo?.video?.id} 
                      me={myChannelData}
                    />
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