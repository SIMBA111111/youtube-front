"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Navigation } from "swiper/modules";
import dynamic from "next/dynamic";
import { FC, RefObject, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

import { Spinner, Svg, Text } from "@/shared/ui";
import { getVideoById, IGetVideoById } from "@/shared/api/video/getVideoById";
import { EvaluateVideo } from "@/features/videoDescription/evaluateVideo/ui";
import { ShareVideo } from "@/features/videoDescription/shareVideo/ui";
import { CommentsVideo } from "@/features/videoDescription/commentsVideo/ui";
import { SubscribeButton } from "@/features";
import { getVideos } from "@/shared/api/video/getVideoList";
import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { mapIGetVideoToIVideoFullInfo } from "@/shared/maps/mapIGetVideoToIVideoFullInfo";

import styles from "./styles.module.scss";

const ShortPlayer = dynamic(
  () => import('@webitch/short-player'),
  { ssr: false }
);

interface IPagination {
  offset: number
  limit: number
}

const PAGINATION_STEP = 5

interface IShortsSwiper {
  initVideo: IGetVideoById
  videoId: string
  myChannelData: any
}

export const ShortsSwiper: FC<IShortsSwiper> = ({
  initVideo,
  videoId,
  myChannelData
}) => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const isActiveIndexRef = useRef(0); 
  const isFetchingRef = useRef(false);
  const [shortVideos, setShortVideos] = useState<IVideoFullInfo[]>([mapIGetVideoToIVideoFullInfo(initVideo)]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentShortVideo, setCurrentShortVideo] = useState<IGetVideoById>(initVideo);
  const paginationRef = useRef<IPagination>({ offset: 0, limit: 5 });

  const fetchVideos = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    
    const { offset, limit } = paginationRef.current;
    const res = await getVideos(null, 'shorts', true, offset, limit);
    setShortVideos((prev: IVideoFullInfo[]) => [...prev, ...res.data]);
    paginationRef.current = {
      offset: offset + PAGINATION_STEP,
      limit: limit + PAGINATION_STEP,
    };

    isFetchingRef.current = false;
  }

  const handleSlideChange = async (swiper: SwiperClass) => {
    setIsLoading(true)
    const newIndex = swiper.activeIndex;
    if (newIndex === isActiveIndexRef.current) return;
    isActiveIndexRef.current = newIndex;

    const nextVideo = shortVideos[newIndex];
    if (!nextVideo) return;
    if (currentShortVideo?.video?.id === nextVideo.video.id) return;

    // Не ремоунтим компонент — просто меняем URL
    window.history.replaceState(null, '', `/shorts/${nextVideo.video.id}`);

    const resGetVideoById = await getVideoById(nextVideo.video.id, null, null);
    if (resGetVideoById) setCurrentShortVideo(resGetVideoById);
    setIsLoading(false)

    if (newIndex > shortVideos.length - 2) {
      await fetchVideos();
    }
  };

  useEffect(() => {
    (async () => {
      console.log('фетч инит');
      await fetchVideos()
    })()
  }, []);

  const isInitializedRef = useRef(false);

  // Первичная инициализация — только один раз
  useEffect(() => {
    if (isInitializedRef.current) return;
    if (!shortVideos.length || !swiperRef.current?.swiper) return;

    const initialIndex = shortVideos.findIndex(v => v.video.id === videoId);
    if (initialIndex !== -1) {
      swiperRef.current.swiper.slideTo(initialIndex, 0);
      isActiveIndexRef.current = initialIndex;
      isInitializedRef.current = true;
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
          onSlideChangeTransitionStart={handleSlideChange}
        >
          {shortVideos.map((video, index) => (
            <SwiperSlide key={video.video.id} className={styles.slide}>
              {({ isActive }) => (
                <div className={styles.playerWrapper}>
                  <div className={styles.channelInfo}>
                    <div className={styles.channelBtn}>
                      <img 
                        src={currentShortVideo?.channel.avatarUrl ?? '/defaultImages/defaultAvatar.png'} 
                        alt="avatar" 
                        className={styles.channelAvatar}
                      />
                      <SubscribeButton 
                        channelId={currentShortVideo?.channel.id} 
                        isSubscribed={currentShortVideo?.subscriptionData?.deleted === undefined ? false : !currentShortVideo?.subscriptionData?.deleted} 
                        meId={myChannelData?.id || ''} 
                        notificationSetting={currentShortVideo?.subscriptionData?.notificationSettings || false}
                      />
                    </div>
                    <Text className={styles.videoDescription}>{currentShortVideo.video.description}</Text>
                  </div>

                  {/* Рендерим плеер только для активного слайда */}
                  {/* isActive - ключевое, что останавливает звук при паузе. Почему ?*/}
                  {isActive && !isLoading ? (
                    <ShortPlayer
                      key={`player-${currentShortVideo.video.id}`}
                      duration={currentShortVideo.video.duration}
                      playlistUrl={currentShortVideo.video.masterM3u8Url}
                    />
                  ) : (
                    <Spinner/>
                  )}

                  <div className={styles.actionsPlayerWrapper}>
                    <EvaluateVideo
                      isLiked={!!currentShortVideo?.videoStatData?.liked}
                      isDisliked={!!currentShortVideo?.videoStatData?.disliked}
                      likeCount={currentShortVideo?.video.likesCount}
                      dislikeCount={currentShortVideo?.video?.dislikesCount}
                      userId={myChannelData?.id || ''}
                      videoId={currentShortVideo?.video?.id}
                    />
                    <ShareVideo videoId={currentShortVideo?.video?.id} isShort />
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