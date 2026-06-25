'use client'

import { Svg, Text } from "@/shared/ui"
import { handleCopyVideoURL } from "../lib/handlers"
import { useToast } from "@/app/providers/toastProvider"
import styles from './styles.module.scss'

interface IShareVideo{
    videoHash: string,
    isShort?: boolean
}

export const ShareVideo: React.FC<IShareVideo> = ({
    videoHash,
    isShort
}) => {
    const {openToast} = useToast()

    return (
        <button className={styles.rating_share} onClick={() => handleCopyVideoURL(videoHash, openToast, isShort)}>
            <Svg name="share" color="black"/>
            <Text>Поделиться</Text>
        </button>
    )
}