'use client'

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { IVideo } from "../modal/types";
import { getAverageColor } from "@/shared/utils/getAverageColor";
import { formatDuration } from "@/shared/utils/formatDuration";
import { formatViews } from "@/shared/utils/formatViews";
import { formatDate } from "@/shared/utils/formatDate";
// import { handleMenuClick } from "../lib/handlers";
import { Modal, Svg, Text } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { handleHideChannel, handleHideVideo, handleMenuClick, handleReport, handleShareVideo, handleViewLater } from "../lib/handlers";
import { getEllipsisText } from "@/shared/utils/getEllipsisText";
import styles from "./styles.module.scss";
import { SettigsVideoModal } from "./settingsModal";

interface IThumbnailVideoCard {
    video: IVideo
    isRow?: boolean
}

export const ThumbnailVideoCard:React.FC<IThumbnailVideoCard> = ({ 
    video,
    isRow = false
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const colorRef = useRef<string>('rgba(249, 98, 98, 0.1)');
    const router = useRouter()

    useEffect(() => {
        if (video.previewUrl && imgRef.current) {
            const img = imgRef.current;
            
            const extractAverageColor = () => {
                try {
                    const avgColor = getAverageColor(img);
                    colorRef.current = avgColor;
                } catch (error) {
                    console.error('Error extracting average color:', error);
                    colorRef.current = 'rgb(249, 98, 98)';
                }
            };
            
            if (img.complete) {
                extractAverageColor();
            } else {
                img.onload = extractAverageColor;
            }
        }
    }, [video.previewUrl]);

    const handleSound = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsSoundOn((prev: boolean) => !prev)
    } 

    const handleRoute = (e: React.MouseEvent) => {
        e.stopPropagation()
        router.push(`videos/${video.videoHash}`)
    } 

    return (
        <div className={styles.wrap}>
            <Link 
                onClick={(e: React.MouseEvent) => handleRoute(e)}
                className={styles.cardContainer}
                href={`watch?v=${video.videoHash}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div 
                    style={{ 
                        '--custom-color': colorRef.current
                    } as React.CSSProperties}
                    className={isRow ? styles.card_Row : styles.card}

                >
                    {/* Контейнер для превью */}
                    <div className={isRow ? styles.thumbnailContainer_Row : styles.thumbnailContainer}>
                        {/* Превью изображение */}
                        <img
                            src={video.previewUrl || '/placeholder-thumbnail.jpg'}
                            alt={video.name}
                            ref={imgRef}
                            className={isRow ? styles.thumbnail_Row : styles.thumbnail}
                        />
                        
                        {/* Видеопревью при наведении */}
                        {isHovered && video.videoPreviewUrl && (
                            <video
                                className={styles.videoPreview}
                                src={video.videoPreviewUrl}
                                autoPlay
                                muted = {!isSoundOn}
                                loop
                                playsInline
                            />
                        )}
                        
                        {/* Длительность видео */}
                        <div className={styles.durationBadge}>
                            {formatDuration(video.duration)}
                        </div>
                        
                        {/* Прогресс-бар */}
                        <div className={styles.progressBar}>
                            <div className={`${styles.progressFill} ${isHovered ? styles.progressFillActive : ''}`}></div>
                        </div>
                    </div>

                    {/* Информация о видео */}
                    <div className={isRow ? styles.infoContainer_Row : styles.infoContainer}>
                        {/* Аватар канала */}
                        {!isRow && <img 
                            src={video.channel?.avatarUrl || '/default-avatar.png'} 
                            alt={video.channel?.name || 'Channel'}
                            className={styles.channelAvatar}
                        />}
                        
                        <div className={styles.header}>
                            <h3 className={styles.title}>
                                {getEllipsisText(video.name, 90)}
                            </h3>

                            <div className={styles.ellipsis} onClick={(e: MouseEvent) => handleMenuClick(e, setIsOpenModal)}>
                                <Svg name="verticalEllipsis" />
                            </div>
                            {!isRow &&
                                <div className={styles.modalPosition}>
                                    <SettigsVideoModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} video={video} />
                                </div>
                            }
                        </div>
                        
                        {/* Название канала */}
                        <p className={styles.channelName}>
                            <Text size={isRow ? 12 : 14} color="var(--gray)">{video.channel?.name}</Text>
                        </p>
                        
                        {/* Статистика */}
                        <div className={styles.stats}>
                            <Text size={isRow ? 12 : 14} color="var(--gray)">{formatViews(video.viewersCount || 0)} просмотров</Text>
                            <span className={styles.dot}></span>
                            <Text size={isRow ? 12 : 14} color="var(--gray)">
                                {video.datePublication ? formatDate(video.datePublication) : 'давно'}
                            </Text>
                        </div>

                    </div>
                </div>

                {isHovered && !isRow && 
                    <button 
                        className={styles.soundBadge} 
                        onClick={(e) => handleSound(e)}
                    >
                        {isSoundOn ? <Svg name={'soundOn'}/> : <Svg name={'soundOff'}/>}
                    </button>
                }
            </Link>

            {isRow &&                                
                <div className={styles.modalPosition}>
                    <SettigsVideoModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} video={video} />
                </div>
            }
        </div>
    );
};