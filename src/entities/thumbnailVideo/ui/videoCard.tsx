'use client'

import { useState, useRef, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { IVideo } from "../modal/types";
import styles from "./styles.module.scss";
import { getAverageColor } from "@/shared/utils/getAverageColor";
import { formatDuration } from "@/shared/utils/formatDuration";
import { formatViews } from "@/shared/utils/formatViews";
import { formatDate } from "@/shared/utils/formatDate";
import { handleMenuClick } from "../lib/handlers";

export const ThumbnailVideoCard = ({ video }: { video: IVideo }) => {
    const [isHovered, setIsHovered] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const colorRef = useRef<string>('rgba(249, 98, 98, 0.1)');

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

    return (
        <Link 
            style={{ 
                '--custom-color': colorRef.current
            } as React.CSSProperties}
            href={`videos/${video.videoHash}`}
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                        muted
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
                    className={`${styles.menuButton} ${isHovered ? styles.menuButtonVisible : ''}`}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => handleMenuClick(e, video)}
                    aria-label="Меню видео"
                >
                    <svg className={styles.menuIcon} viewBox="0 0 24 24">
                        <circle cx="12" cy="6" r="1.5"/>
                        <circle cx="12" cy="12" r="1.5"/>
                        <circle cx="12" cy="18" r="1.5"/>
                    </svg>
                </button>
            </div>
        </Link>
    );
};