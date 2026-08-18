"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'

import { formatDuration } from "@/shared/utils/formatDuration";
import { formatViews } from "@/shared/utils/formatViews";
import { formatDate } from "@/shared/utils/formatDate";
import { Modal, Svg, Text } from "@/shared/ui";
import { hexToRgb } from "@/shared/utils/hexToRgb";

import { handleMenuClick } from "../lib/handlers";
import { SettigsVideoModal } from "./settingsModal";
import { IVideo } from "../modal/types";
import { getChannelDataClient } from "@/shared/hooks/getChannelDataClient";
import styles from "./styles.module.scss";

interface IThumbnailVideoCard {
  video: IVideo;
  isRow?: boolean;
}

export const ThumbnailVideoCard: React.FC<IThumbnailVideoCard> = ({
  video,
  isRow = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const channelData = getChannelDataClient() 
  const router = useRouter()

  const handleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSoundOn((prev: boolean) => !prev);
  };


  // Обработчик клика по карточке
  const handleCardClick = (e: React.MouseEvent) => {
    // Игнорируем клики по ссылкам и кнопкам внутри
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    
    // Обычный клик
    if (e.button === 0) {
      router.push(`/watch?v=${video?.id}`);
    }
  };

  // Обработчик для средней кнопки (колесико)
  const handleCardAuxClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return;
    }
    
    // Клик колесиком (button === 1)
    if (e.button === 1) {
      e.preventDefault();
      window.open(`/watch?v=${video?.id}`, '_blank');
    }
  };

  return (
    <div className={styles.wrap}>
      <div
        className={styles.cardContainer}
        onClick={handleCardClick}
        onAuxClick={handleCardAuxClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="link"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      >
        <div
          style={
            {
              "--custom-color": hexToRgb(video.averageColor),
            } as React.CSSProperties
          }
          className={isRow ? styles.card_Row : styles.card}
        >
          {/* Контейнер для превью */}
          <div
            className={
              isRow ? styles.thumbnailContainer_Row : styles.thumbnailContainer
            }
          >
            {/* Превью изображение */}
            <img
              src={video?.previewUrl || "/defaultImages/defaultAvatar.png"}
              alt={video?.name}
              className={isRow ? styles.thumbnail_Row : styles.thumbnail}
            />

            {/* Видеопревью при наведении */}
            {isHovered && video?.videoPreviewUrl && (
              <video
                className={styles.videoPreview}
                src={video?.videoPreviewUrl}
                autoPlay
                muted={!isSoundOn}
                loop
                playsInline
              />
            )}

            {/* Длительность видео */}
            <div className={styles.durationBadge}>
              {formatDuration(video?.duration)}
            </div>
          </div>

          {/* Информация о видео */}
          <div
            className={isRow ? styles.infoContainer_Row : styles.infoContainer}
          >
            {/* Аватар канала */}
            {!isRow && (
              <img
                src={video?.channel?.avatarUrl || "/default-avatar.png"}
                alt={video?.channel?.username || "Channel"}
                className={styles.channelAvatar}
              />
            )}

            <div className={styles.header}>
              <h3 className={styles.title}>
                {video?.name}
              </h3>

              <div
                className={styles.ellipsis}
                onClick={(e: MouseEvent) => handleMenuClick(e, setIsOpenModal)}
              >
                <Svg name="verticalEllipsis" />
              </div>
                <SettigsVideoModal
                  isOpenModal={isOpenModal}
                  setIsOpenModal={setIsOpenModal}
                  videoId={video.id}
                  userId={channelData?.id || ''}
                />
            </div>

            {/* Название канала - обернуто в Link */}
            <Link
              href={`/channel/${video.channel.username}`}
              onClick={(e) => e.stopPropagation()} // Останавливаем всплытие, чтобы не сработал Link видео
              className={styles.channelName}
            >
              <Text size={isRow ? 12 : 14} color="var(--gray)">
                {video?.channel?.name}
              </Text>
            </Link>

            {/* Статистика */}
            <div className={styles.stats}>
              <Text size={isRow ? 12 : 14} color="var(--gray)">
                {formatViews(video?.viewersCount || 0)} просмотров
              </Text>
              <span className={styles.dot}></span>
              <Text size={isRow ? 12 : 14} color="var(--gray)">
                {video?.datePublication
                  ? formatDate(video?.datePublication)
                  : "давно"}
              </Text>
            </div>
          </div>
        </div>

        {isHovered && !isRow && (
          <button className={styles.soundBadge} onClick={(e) => handleSound(e)}>
            {isSoundOn ? <Svg name={"soundOn"} /> : <Svg name={"soundOff"} />}
          </button>
        )}
      </div>
    </div>
  );
};