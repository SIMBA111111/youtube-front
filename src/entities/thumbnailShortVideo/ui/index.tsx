'use client'

import { Text } from "@/shared/ui"
import { IThumbnailShortVideo } from "../modal/types"

import styles from './styles.module.scss'
import { formatViews } from "@/shared/utils/formatViews"
import { useRef } from "react"
import { getAverageColor } from "@/shared/utils/getAverageColor"

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
}) => {
    const colorRef = useRef<HTMLImageElement>(null)

    return (
        <div style={{'--custom-color': getAverageColor(colorRef.current)} as React.CSSProperties} className={styles.shortContainer}>
            <img ref={colorRef} src={previewUrl} alt="preview" className={styles.img}/>
            <Text>{name}</Text>
            <Text>{formatViews(viewersCount)}</Text>
        </div>
    )
}