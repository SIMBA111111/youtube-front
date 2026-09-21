'use client'

import Link from "next/link"

import { Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { useRef, useState } from "react"
import { getAverageColor } from "@/shared/utils/getAverageColor"
import { SettigsVideoModal } from "@/entities/thumbnailVideo/ui/settingsModal"
import { IThumbnailShortVideo } from "../modal/types"

import styles from './styles.module.scss'
import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types"


interface IThumbnailShortVideoCard {
    video: IVideoFullInfo
    isRow?: boolean
}

export const ThumbnailShortVideoCard: React.FC<IThumbnailShortVideoCard> = ({
    video,
    isRow = false
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const colorRef = useRef<HTMLImageElement>(null)
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsOpenModal(true)
    };

    return (
        <Link 
            href={`/shorts/${video.video.id}`} 
            className={styles.shortContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.contentWrapper}>
                <img ref={colorRef} src={video.video?.thumbnailUrl} alt="thumbnailUrl" className={styles.img}/>

                {isHovered && video.video?.videoPreviewUrl && (
                    <video
                        className={styles.videoPreview}
                        src={video.video.videoPreviewUrl}
                        autoPlay
                        // muted = {!isSoundOn}
                        loop
                        playsInline
                    />
                )}
            </div>
            
            <div className={styles.header}>
                <Text size={14} weight={600} className={styles.shortVideoName}>{video.video.name}</Text>
                <div className={styles.ellipsis} onClick={(e: React.MouseEvent) => handleMenuClick(e)}>
                    <Svg name="verticalEllipsis" />
                </div>
                <SettigsVideoModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} videoId={video.video.id} userId={video.channel.channelId}/>
            </div>
            <Text color="var(--gray)" size={12}>{formatViews(video.video.viewersCount)} просмотров</Text>
        </Link>
    )
}