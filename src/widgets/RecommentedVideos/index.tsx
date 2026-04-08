"use client"

import { useRef, useState } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { IVideo } from "@/entities/thumbnailVideo/modal/types"
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard"
import { ThumbnailShortVideoCard } from "@/entities"

import styles from "./styles.module.scss"
import { Svg } from "@/shared/ui"

interface IRecommentedVideos {
    videos: IVideo[]
}

export const RecommentedVideos: React.FC<IRecommentedVideos> = ({ videos }) => {
    const fullVideos = videos.filter((video: IVideo) => !video.isShort)
    const shortVideos = videos.filter((video: IVideo) => video.isShort)

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
            {fullVideos.map((video: IVideo) => {
                return  video.isShort ?
                    <div key={video.id} className={styles.shortVideoCardWrapper}>
                        <ThumbnailShortVideoCard key={video.id} {...video} isRow/>
                    </div>
                :
                    <div key={video.id} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard key={video.id} video={video} isRow/>
                    </div>
            })}
            <div className={styles.shortVideoWrapper}>
                <Swiper 
                    style={{display: 'flex'}}
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
                        nextEl: '.custom-swiper-button-next',
                        prevEl: '.custom-swiper-button-prev',
                    }}
                >
                {shortVideos.map((short, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div key={short.id} className={styles.shortVideoCardWrapper}>
                            <ThumbnailShortVideoCard key={short.id} {...short} isRow/>
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
                        <Svg name="shortArrowUp"/>
                    </button>

                    <button 
                        className={`${styles.navButton} ${styles.navButtonNext}`}
                        onClick={handleNext}
                        aria-label="Следующее видео"
                    >
                        <Svg name="arrowLeft"/>
                    </button>
                </div>
            </div>
        </div>
    )
}




