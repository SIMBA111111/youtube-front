'use client'

import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailShortVideoCard } from "@/entities";
import { Svg } from "@/shared/ui";

import styles from "./styles.module.scss";


export const ShortsSwiper = ({videos}: {videos : IVideo[]}) => {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

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

    const updateNavigationState = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setIsBeginning(swiperRef.current.swiper.isBeginning);
            setIsEnd(swiperRef.current.swiper.isEnd);
        }
    };

    return (
        <div>
            <div className={styles.shortVideoWrapper}>
                <Swiper 
                    style={{display: 'flex'}}
                    ref={swiperRef}
                    direction="horizontal" 
                    className={styles.swiper} 
                    slidesPerView={4}
                    modules={[Navigation]}
                    onSlideChange={updateNavigationState}
                    onSwiper={(swiper: SwiperType) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    navigation={{
                        nextEl: '.custom-swiper-button-next',
                        prevEl: '.custom-swiper-button-prev',
                    }}
                >
                    {videos.map((short, index) => (
                        <SwiperSlide key={index} className={styles.slide}>
                            <div className={styles.shortVideoCardWrapper}>
                                <ThumbnailShortVideoCard {...short} isRow/>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className={styles.navButtons}>
                    <button 
                        className={`${styles.navButton} ${styles.navButtonPrev} ${isBeginning ? styles.hidden : ''}`}
                        onClick={handlePrev}
                        aria-label="Предыдущее видео"
                        disabled={isBeginning}
                    >
                        <Svg name="shortArrowLeft"/>
                    </button>

                    <button 
                        className={`${styles.navButton} ${styles.navButtonNext} ${isEnd ? styles.hidden : ''}`}
                        onClick={handleNext}
                        aria-label="Следующее видео"
                        disabled={isEnd}
                    >
                        <Svg name="shortArrowRight"/>
                    </button>
                </div>
            </div>

            <div></div>
        </div>
    )
}