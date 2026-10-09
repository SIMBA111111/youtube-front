"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

import {  Playlist } from "@/entities/playlist/ui";
import { IVideoFullInfo, IViewedVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Svg, Text } from "@/shared/ui";

import styles from "./styles.module.scss";

import "swiper/css";
import clsx from "clsx";
import { IPlaylistEntity } from "@/entities/playlist/model/types";

interface IMyChannelActions {
  items: IVideoFullInfo[] | IViewedVideoFullInfo[] | IPlaylistEntity[] | undefined | null;
  title: string;
  link: string;
}

// Type guards для проверки типов
const isVideo = (item: IVideoFullInfo | IPlaylistEntity): item is IVideoFullInfo => {
  return "video" in item; // проверь реальные поля IVideo
};

export const MyChannelActions: React.FC<IMyChannelActions> = ({
  items,
  title,
  link,
}) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current?.swiper) {
      const swiper = swiperRef.current.swiper;
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);

      swiper.on("slideChange", () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      });
    }
  }, []);

  const handleNext = () => {
    if (swiperRef.current?.swiper) {
      const currentIndex = swiperRef.current.swiper.activeIndex;
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  if (!items) {
    return (
      <div>
        Нет данных...
      </div>
    )
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <Text size={20} weight={700} className={styles.sectionTitle}>
          {title}
        </Text>
        <div className={styles.sectionNav}>
          <Link href={link} className={styles.sectionLink}>
            Посмотреть все
          </Link>
          <button
            className={clsx(
              styles.sectionNav_arrow,
              isBeginning && styles.disabled
            )}
            onClick={() => handlePrev()}
          >
            <Svg name="shortArrowLeft" />
          </button>
          <button
            className={clsx(styles.sectionNav_arrow, isEnd && styles.disabled)}
            onClick={() => handleNext()}
          >
            <Svg name="shortArrowRight" />
          </button>
        </div>
      </div>

      <div className={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          direction="horizontal"
          className={styles.swiper}
          slidesPerView={5}
          modules={[Navigation]}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {items
            .map((item, index) => (
            <SwiperSlide
              key={index}
              className={styles.slide}
              style={{ marginRight: 0 }}
            >
              <div className={styles.shortVideoCardWrapper}>
                {isVideo(item) ? (
                  <ThumbnailVideoCard video={item} />
                ) : (
                  <div className={styles.shortVideoCardWrapperPlayList}>
                    <Playlist
                      playlist={item}
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
