"use client";

import React, { useState, MouseEvent } from "react";
import Link from "next/link";

import { IVideo } from "../../modal/types";
import { formatDuration } from "@/shared/utils/formatDuration";
import { formatViews } from "@/shared/utils/formatViews";
import { formatDate } from "@/shared/utils/formatDate";
import { Modal, Svg, Text } from "@/shared/ui";

import { handleMenuClick } from "../../lib/handlers";
import { SettigsVideoModal } from "../settingsModal";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";


interface ISearchVideoItem {
  video: IVideo;
  isRow?: boolean;
  userId: string
}

export const SearchVideoItem: React.FC<ISearchVideoItem> = ({
  video,
  isRow = false,
  userId
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter()
  
  const handleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsSoundOn((prev: boolean) => !prev);
  };

  const handleGoToChannel = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/channel/${video.channel.username}`)
  }

  return (
    <div className={styles.wrapper}>
      <Link
        className={isRow ? styles.searchVideoItem_row : styles.searchVideoItem}
        href={`/watch?v=${video?.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
          <div className={ isRow ? styles.thumbnailContainer_Row : styles.thumbnailContainer }>
            <img
              src={video?.previewUrl || "/defaultImages/defaultAvatar.png"}
              alt={video?.name}
              className={isRow ? styles.thumbnail_Row : styles.thumbnail}
            />

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

              <div className={styles.durationBadge}>
                <Text color="white">
                  {formatDuration(video?.duration)}
                </Text>
              </div>

            {isHovered && (
              <button className={styles.soundBadge} onClick={(e) => handleSound(e)}>
                {isSoundOn ? <Svg name={"soundOn"} /> : <Svg name={"soundOff"} />}
              </button>
            )}
          </div>


          {/* Информация о видео */}
          <div className={isRow ? styles.infoContainer_Row : styles.infoContainer}>

            <div className={styles.header}>
              <h3 className={styles.title}>
                {video?.name}
              </h3>

              <div
                className={styles.settings}
                onClick={(e: MouseEvent) => handleMenuClick(e, setIsOpenModal)}
              >
                <Svg name="verticalEllipsis" />
              </div>
                <SettigsVideoModal
                  isOpenModal={isOpenModal}
                  setIsOpenModal={setIsOpenModal}
                  videoId={video.id}
                  userId={userId}
                />
            </div>

            <div className={styles.stats}>
              <Text size={16} color="var(--gray)">
                {formatViews(video?.viewersCount || 0)} просмотров
              </Text>
              <span className={styles.dot}></span>
              <Text size={16} color="var(--gray)">
                {video?.datePublication
                  ? formatDate(video?.datePublication)
                  : "давно"}
              </Text>
            </div>

            <div className={styles.name} onClick={handleGoToChannel}>
              <img
                src={video?.channel?.avatarUrl || "/default-avatar.png"}
                alt={video?.channel?.username || "Channel"}
                className={styles.channelAvatar}
              />
              <p className={styles.channelName}>
                <Text size={16} color="var(--gray)">
                  {video?.channel?.name}
                </Text>
              </p>
            </div>

            <Text className={styles.description}>{video.videoDescription}</Text>
          </div>
      </Link>
    </div>
  );
};
