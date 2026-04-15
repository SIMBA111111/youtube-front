'use client'

import Link from "next/link"

import { Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { useRef, useState } from "react"
import { getAverageColor } from "@/shared/utils/getAverageColor"
import { SettigsVideoModal } from "@/entities/thumbnailVideo/ui/settingsModal"

import { IThumbnailShortVideo } from "../modal/types"
import styles from './styles.module.scss'

export const ThumbnailShortVideoSmallCard: React.FC<IThumbnailShortVideo> = ({
    id,
    name,
    videoHash,
    previewUrl,
    videoPreviewUrl,
    viewersCount,
    channel,
    isRow = false
}) => {

    return (
        <Link 
            href={`/shorts/${videoHash}`} 
            className={styles.shortContainer}
        >
            <div className={styles.contentWrapper}>
                <img src={previewUrl} alt="preview" className={styles.img}/>
            </div>
            
            <div className={styles.viewers}>
                <Text color="var(--whiteText)" >{formatViews(viewersCount)} просмотров</Text>
            </div>
        </Link>
    )
}