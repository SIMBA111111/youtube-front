'use client'

import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"

import { IPlaylist, Playlist } from "@/entities/playlist/ui"
import { IVideo } from "@/entities/thumbnailVideo/modal/types"
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard"
import { Svg, Text } from "@/shared/ui"

import styles from "./styles.module.scss"

import 'swiper/css'
import clsx from "clsx"

interface IMyChannelActions {
    items: IVideo[] | IPlaylist[]
    title: string
    link: string
}

// Type guards для проверки типов
const isVideo = (item: IVideo | IPlaylist): item is IVideo => {
    return 'videoId' in item || 'duration' in item // проверь реальные поля IVideo
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
                console.log(swiper.isBeginning);
                console.log(swiper.isEnd);
                
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

    

    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <Text size={20} weight={700} className={styles.sectionTitle}>{title}</Text>
                <div className={styles.sectionNav}>
                    <Link href={link} className={styles.sectionLink}>Посмотреть все</Link>
                    <button className={clsx(styles.sectionNav_arrow, isBeginning && styles.disabled)} onClick={() => handlePrev()}><Svg name="shortArrowLeft"/></button>
                    <button className={clsx(styles.sectionNav_arrow, isEnd && styles.disabled)} onClick={() => handleNext()}><Svg name="shortArrowRight"/></button>
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
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className={styles.slide} style={{marginRight: 0}}>
                            <div className={styles.shortVideoCardWrapper}>
                                {isVideo(item) ? (
                                    <ThumbnailVideoCard video={item as IVideo}/>
                                ) : (
                                    <div className={styles.shortVideoCardWrapperPlayList}>
                                        <Playlist
                                            channel={item.channel} 
                                            playlistName={item.playlistName} 
                                            playlistPreview={item.playlistPreview} 
                                            videos={item.videos} 
                                            updatedAt={item.updatedAt}
                                            createdAt={item.updatedAt}
                                        />
                                    </div>

                                )}
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
            </div>
        </div>
    );
};