'use client'

import Link from "next/link"

import { Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { useRef, useState } from "react"
import { getAverageColor } from "@/shared/utils/getAverageColor"
import { SettigsVideoModal } from "@/entities/thumbnailVideo/ui/settingsModal"
import { IThumbnailShortVideo } from "../modal/types"

import styles from './styles.module.scss'


export const ThumbnailShortVideoCard: React.FC<IThumbnailShortVideo> = ({
    id,
    name,
    videoHash,
    duration,
    previewUrl,
    videoPreviewUrl,
    viewersCount,
    channel,
    datePublication,
    isShort,
    isRow = false
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const colorRef = useRef<HTMLImageElement>(null)
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsOpenModal(true)
        console.log('Open menu for video');
    };

    return (
        <Link 
            // href={`/shorts/${videoHash}`} style={{'--custom-color': getAverageColor(colorRef.current)} as React.CSSProperties} 
            href={`/shorts/${videoHash}`} 
            className={styles.shortContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.contentWrapper}>
                <img ref={colorRef} src={previewUrl} alt="preview" className={styles.img}/>

                {isHovered && videoPreviewUrl && (
                    <video
                        className={styles.videoPreview}
                        src={videoPreviewUrl}
                        autoPlay
                        // muted = {!isSoundOn}
                        loop
                        playsInline
                    />
                )}
            </div>
            
            <div className={styles.header}>
                <Text size={14} weight={600} className={styles.shortVideoName}>{name}</Text>
                <div className={styles.ellipsis} onClick={(e: MouseEvent) => handleMenuClick(e)}>
                    <Svg name="verticalEllipsis" />
                </div>
                <SettigsVideoModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} videoId={id} userId={channel.id}/>
            </div>
            <Text color="var(--gray)" size={12}>{formatViews(viewersCount)} просмотров</Text>
        </Link>
    )
}