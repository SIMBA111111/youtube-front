"use client"

import { useEffect, useRef, useState } from "react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { IVideo } from "@/entities/thumbnailVideo/modal/types"
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard"
import { ThumbnailShortVideoCard } from "@/entities"

import { Spinner, Svg } from "@/shared/ui"
import { getShortVideos } from "@/shared/api/video/getShortVideos"
import { getVideos } from "@/shared/api/video/getVideoList"
import styles from "./styles.module.scss"

interface IRecommentedVideos {
    initVideos: IVideo[]
}

export const RecommentedVideos: React.FC<IRecommentedVideos> = ({ initVideos }) => {
    const [videoList, setVideoList] = useState<IVideo[]>(initVideos)
    const [isLoading, setIsLoading] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!loadingRef.current) return
        if (observerRef.current) return

        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 1
        }

        const callback = async (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0]
            
            if (entry.isIntersecting && !isLoading) {
                // console.log('ДОСТИГЛИ ДНА, ГРУЗИМ СТРАНИЦУ')
                setIsLoading(true)
                
                try {
                    setTimeout(async () => {
                        const res = await getVideos()
                        // console.log('ПОЛУЧЕНО НОВЫХ ВИДЕО:', res.length)
                        setVideoList(prev => [...prev, ...res])
                        setIsLoading(false)

                    }, 3000)

                } catch (error) {
                    setIsLoading(false)
                    console.error('ОШИБКА ЗАГРУЗКИ:', error)
                }
            }
        }

        observerRef.current = new IntersectionObserver(callback, options)
        observerRef.current.observe(loadingRef.current)

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }
        }
    }, [isLoading]) // Добавил зависимости

    const fullVideos = initVideos.filter((video: IVideo) => !video.isShort)
    const shortVideos = initVideos.filter((video: IVideo) => video.isShort)

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
            {videoList.filter((video: IVideo[]) => !video.isShort).map((video: IVideo, index) => {
                return (
                    <div key={index} className={styles.videoCardWrapper}>
                        <ThumbnailVideoCard key={video.id} video={video} isRow/>
                    </div>
                )
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
                {videoList.filter((video: IVideo[]) => video.isShort).map((short, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div className={styles.shortVideoCardWrapper}>
                            <ThumbnailShortVideoCard {...short} isRow/>
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
            <div ref={loadingRef} style={{ height: '10px', margin: '20px 0' }}>
                {isLoading && <div className={styles.recommendedVideoLoader}><Spinner/></div>}
            </div>
        </div>
    )
}




