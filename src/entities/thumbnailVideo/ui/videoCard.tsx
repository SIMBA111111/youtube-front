'use client'

import { useState } from "react";
import Link from "next/link";
import * as Vibrant from 'node-vibrant';
import { IVideo } from "../modal/types";

import styles from "./styles.module.scss";
import { useRef } from "react";
import { useEffect } from "react";

export const ThumbnailVideoCard = ({ video }: { video: IVideo }) => {
    const [isHovered, setIsHovered] = useState(false);


    const [backgroundColor, setBackgroundColor] = useState<string>('#0f0f0f');
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (video.previewUrl) {
            // Анализируем изображение и получаем доминирующий цвет
            Vibrant.from(video.previewUrl)
                .getPalette()
                .then((palette: any) => {
                    // Берем доминирующий цвет или цвет из палитры
                    const dominantColor = palette.DarkVibrant || 
                                         palette.Vibrant || 
                                         palette.DarkMuted;
                    
                    if (dominantColor) {
                        setBackgroundColor(dominantColor.getHex());
                    }
                })
                .catch((err: any) => {
                    console.error('Error getting vibrant color:', err);
                });
        }
    }, [video.previewUrl]);
    
    // Форматирование времени
    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    // Форматирование числа просмотров
    const formatViews = (views: number): string => {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1).replace('.0', '') + ' млн';
        }
        if (views >= 1000) {
            return (views / 1000).toFixed(1).replace('.0', '') + ' тыс';
        }
        return views.toString();
    };

    // Форматирование даты публикации
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'сегодня';
        if (diffDays === 1) return 'вчера';
        if (diffDays < 7) return `${diffDays} дня назад`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} недели назад`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} месяца назад`;
        return `${Math.floor(diffDays / 365)} года назад`;
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Предотвращаем переход по ссылке
        e.stopPropagation(); // Останавливаем всплытие
        // Здесь можно открыть меню с опциями видео
        console.log('Open menu for video:', video.videoHash);
    };

    return (
        <Link 
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

            {/* Информация о видео - используется grid template areas */}
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
                
                {/* Статистика: просмотры и дата */}
                <div className={styles.stats}>
                    <span>{formatViews(video.viewersCount || 0)} просмотров</span>
                    <span className={styles.dot}></span>
                    <span>
                        {video.datePublication ? formatDate(video.datePublication) : 'давно'}
                    </span>
                </div>

                {/* Кнопка меню (три точки) */}
                <button 
                    className={`${styles.menuButton} ${isHovered ? styles.menuButtonVisible : ''}`}
                    onClick={handleMenuClick}
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