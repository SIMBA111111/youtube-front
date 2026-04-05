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
import styles from "./styles.module.scss";

export const ThumbnailVideoCard = ({ video }: { video: IVideo }) => {
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
        <Link 
            onClick={(e: React.MouseEvent) => handleRoute(e)}
            className={styles.cardContainer}
            href={`watch?v=${video.videoHash}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div 
                style={{ 
                    '--custom-color': colorRef.current
                } as React.CSSProperties}
                className={styles.card}

            >
                {/* Контейнер для превью */}
                <div className={styles.thumbnailContainer}>
                    {/* Превью изображение */}
                    <img
                        src={video.previewUrl || '/placeholder-thumbnail.jpg'}
                        alt={video.name}
                        ref={imgRef}
                        className={styles.thumbnail}
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
                <div className={styles.infoContainer}>
                    {/* Аватар канала */}
                    <img 
                        src={video.channel?.avatarUrl || '/default-avatar.png'} 
                        alt={video.channel?.name || 'Channel'}
                        className={styles.channelAvatar}
                    />
                    
                    {/* Заголовок видео */}
                    <h3 className={styles.title}>
                        {video.name}
                    </h3>
                    
                    {/* Название канала */}
                    <p className={styles.channelName}>
                        {video.channel?.name || 'Неизвестный канал'}
                    </p>
                    
                    {/* Статистика */}
                    <div className={styles.stats}>
                        <span>{formatViews(video.viewersCount || 0)} просмотров</span>
                        <span className={styles.dot}></span>
                        <span>
                            {video.datePublication ? formatDate(video.datePublication) : 'давно'}
                        </span>
                    </div>

                    {/* Кнопка меню */}
                    <button 
                        className={styles.menuButton}
                        onClick={(e: MouseEvent<HTMLButtonElement>) => handleMenuClick(e, setIsOpenModal)}
                    >
                        <Svg name="verticalEllipsis" />
                    </button>

                    <Modal isVisible={isOpenModal} setIsVisible={setIsOpenModal} isCloseButton={false} className={styles.modal}>
                        <div className={styles.modalContainer}>
                            <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleViewLater(e, video, 'user')}>
                                <Svg name='clock'/>
                                <Text>Смотреть позже</Text>
                            </div>
                            <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleShareVideo(e, video, 'user')}>
                                <Svg name='replay'/>
                                <Text>Поделиться</Text>
                            </div>
                            <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleHideVideo(e, video, 'user')}>
                                <Svg name='block'/>
                                <Text>Не интересует</Text>
                            </div>
                            <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleHideChannel(e, video, 'user')}>
                                <Svg name='brick'/>
                                <Text>Не рекомендовать видео с этого канала</Text>
                            </div>
                            <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleReport(e, video, 'user')}>
                                <Svg name='flag'/>
                                <Text>Пожаловаться</Text>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>

            {isHovered && 
                <button 
                    className={styles.soundBadge} 
                    onClick={(e) => handleSound(e)}
                >
                    {isSoundOn ? <Svg name={'soundOn'}/> : <Svg name={'soundOff'}/>}
                </button>
            }
        </Link>
    );
};