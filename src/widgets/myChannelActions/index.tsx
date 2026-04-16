'use client'

import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRef, useState, useEffect } from "react"

import { IPlaylist } from "@/entities/playlist/ui"
import { IVideo } from "@/entities/thumbnailVideo/modal/types"
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard"

import styles from "./styles.module.scss"
import { Svg } from "@/shared/ui"

import 'swiper/css'

interface IMyChannelActions {
    items: IVideo[] | IPlaylist[]
    title: string
    link: string
}

export const MyChannelActions: React.FC<IMyChannelActions> = ({
    items,
    title,
    link
}) => {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (swiperRef.current?.swiper) {
            const swiper = swiperRef.current.swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            
            swiper.on('slideChange', () => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
            });
        }
    }, []);

    const handleNext = () => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{title}</h3>
                <a href={link} className={styles.sectionLink}>Всё</a>
            </div>
            
            <div className={styles.swiperContainer}>
                <Swiper 
                    ref={swiperRef}
                    direction="horizontal" 
                    className={styles.swiper} 
                    slidesPerView="auto"
                    spaceBetween={16}
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
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className={styles.slide}>
                            <div className={styles.shortVideoCardWrapper}>
                                
                                // сделать проверку на тип и отображать нужную карточку
                                
                                {/* <ThumbnailVideoCard video={item}/> */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {!isBeginning && (
                    <button 
                        className={`${styles.navButton} ${styles.navButtonPrev}`}
                        onClick={handlePrev}
                        aria-label="Предыдущее"
                    >
                        <Svg name="shortArrowUp"/>
                    </button>
                )}

                {!isEnd && items.length > 3 && (
                    <button 
                        className={`${styles.navButton} ${styles.navButtonNext}`}
                        onClick={handleNext}
                        aria-label="Следующее"
                    >
                        <Svg name="arrowLeft"/>
                    </button>
                )}
            </div>
        </div>
    );
};