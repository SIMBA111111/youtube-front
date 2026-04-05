"use client"

import { ShortPlayer } from "@webitch/short-player";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Svg } from "@/shared/ui";
import styles from "./styles.module.scss";

export default function Shorts() {
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
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
        >
          {[1,2,3,4,5,6].map((_, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.playerWrapper}>
                <ShortPlayer 
                  duration={30} 
                  playlistUrl="/videos/long-video/longVideo.m3u8" 
                  theme="dark"
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
            <Svg name="arrowUp"/>
          </button>

          <button 
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={handleNext}
            aria-label="Следующее видео"
          >
            <Svg name="arrowDown"/>
          </button>
        </div>
      </div>
    </div>
  );
}