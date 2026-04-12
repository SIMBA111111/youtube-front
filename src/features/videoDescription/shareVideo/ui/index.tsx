'use client'

import { Svg, Text } from "@/shared/ui"
import { handleCopyVideoURL } from "../lib/handlers"
import { useToast } from "@/app/providers/toastProvider"
import styles from './styles.module.scss'

interface IShareVideo{
    videoHash: string,
}

export const ShareVideo: React.FC<IShareVideo> = ({
    videoHash
}) => {
    const {openToast} = useToast()

    return (
        <button className={styles.rating_share} onClick={() => handleCopyVideoURL(videoHash, openToast)}>
            <Svg name="share" color="black"/>
            <Text>Поделиться</Text>
        </button>
    )
}