"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { ThumbnailShortVideoCard } from "@/entities";
import { Spinner, Svg } from "@/shared/ui";
import { getRecommentedVideos } from "@/shared/api/video/getRecommentedVideos";
import { useInfitityScroll } from "@/shared/hooks/useInfitityScroll";
import styles from "./styles.module.scss";

interface IRecommentedVideos {
  // initVideos: IVideo[];
  videoHash: string;
  myChannelId?: string;
}

export const RecommentedVideos: React.FC<IRecommentedVideos> = ({
  // initVideos,
  videoHash,
  myChannelId,
}) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchRecommendedVideoList = async ({
    offset,
    limit,
    filter
  }: {
    offset: number,
    limit: number
    filter?: any
  }) => {
    const res = await getRecommentedVideos(
      videoHash,
      offset,
      limit,
      myChannelId
    );

    return res?.videos || []
  }

  const { 
    data,
    isLoading,
    hasMore,
  } = useInfitityScroll<IVideo, any>({
    paginationStep: 20,
    filter: '',
    fetchData: fetchRecommendedVideoList,
    triggerRef: loadingRef
  })

  console.log('data = ', data);
  

  // const fullVideos = initVideos.filter((video: IVideo) => !video.isShort);
  // const shortVideos = initVideos.filter((video: IVideo) => video.isShort);

  const swiperRef = useRef(null);

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

  return (
    <div className={styles.container}>
      {data
        .filter((video: IVideo[]) => !video.isShort)
        .map((video: IVideo, index) => {
          return (
            <div key={index} className={styles.videoCardWrapper}>
              <ThumbnailVideoCard key={video.id} video={video} isRow />
            </div>
          );
        })}
      {/* <div className={styles.shortVideoWrapper}>
        <Swiper
          style={{ display: "flex" }}
          ref={swiperRef}
          direction="horizontal"
          className={styles.swiper}
          slidesPerView={3}
          spaceBetween={-10}
          // mousewheel={true}
          modules={[Navigation]}
          // touchStartPreventDefault={false}
          // touchMoveStopPropagation={false}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
        >
          {videoList
            .filter((video: IVideo[]) => video.isShort)
            .map((short, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <div className={styles.shortVideoCardWrapper}>
                  <ThumbnailShortVideoCard {...short} isRow />
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
            <Svg name="shortArrowLeft" />
          </button>

          <button
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={handleNext}
            aria-label="Следующее видео"
          >
            <Svg name="arrowLeft" />
          </button>
        </div>
      </div> */}
      {<div ref={loadingRef} style={{ height: "100px", margin: "20px" }}>
        loadingRef
        {isLoading && (
          <div className={styles.recommendedVideoLoader}>
            <Spinner />
          </div>
        )}
      </div>}
    </div>
  );
};
