'use client'

import { Svg, Text } from "@/shared/ui"
import { handleCopyVideoURL } from "../lib/handlers"
import { useToast } from "@/app/providers/toastProvider"
import styles from './styles.module.scss'

interface IShareVideo{
    videoId: string,
    isShort?: boolean
}

export const ShareVideo: React.FC<IShareVideo> = ({
    videoId,
    isShort
}) => {
    const {openToast} = useToast()

    return (
        <button className={styles.rating_share} onClick={() => handleCopyVideoURL(videoId, openToast, isShort)}>
            <Svg name="share" color="black"/>
            <Text>Поделиться</Text>
        </button>
    )
}