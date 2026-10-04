'use client'

import Link from "next/link"

import { Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { IThumbnailShortVideo } from "../../modal/types"

import styles from './styles.module.scss'


export const ThumbnailShortVideoSmallCard: React.FC<IThumbnailShortVideo> = ({
    video,
    isRow = false
}) => {

    console.log('video: ', video);
    

    return (
        <Link 
            href={`/shorts/${video.video.id}`} 
            className={styles.shortContainer}
        >
            <div className={styles.contentWrapper}>
                <img src={video.video.thumbnailUrl} alt="preview" className={styles.img}/>
            </div>
            
            <div className={styles.viewers}>
                <Text color="white" >{formatViews(video.video.viewersCount)} просмотров</Text>
            </div>
        </Link>
    )
}