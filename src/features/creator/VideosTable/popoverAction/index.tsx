import { FC } from "react"
import { Popover, Svg, Text } from "@/shared/ui"
import styles from "./styles.module.scss";
import { useToast } from "@/app/providers/toastProvider";
import { deleteVideo } from "@/shared/api/video/admin/deleteVideo";

interface IPopoverAction {
    onClose: () => void
    isOpen: boolean
    videoId: string
    videoHash: string
    videoMp4Url: string
    channelId: string
}

export const PopoverAction: FC<IPopoverAction> = ({
    isOpen,
    onClose,
    videoId,
    videoHash,
    videoMp4Url,
    channelId
}) => {
    const { openToast } = useToast()

    const handleDownloadVideo = async () => {
        try {
            const response = await fetch(videoMp4Url);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = videoHash;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            console.log('Скачивание начато');
        } catch (error) {
            console.error('Ошибка:', error);
        }  
    }
    
    const handleCopyVideoLink = async () => {
        if (process.env.NEXT_PUBLIC_FRONTEND_URL) {
            await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_FRONTEND_URL + `/watch?v=${videoHash}`) 
            openToast('Ссылка на видео скопирована!')
        }
    }

    const handleDeleteVideo = async () => {
        await deleteVideo(channelId, videoId)
    }

    return (
        <Popover onClose={onClose} isOpen={isOpen} className={styles.popoverAction}>
            <button className={styles.item} onClick={handleCopyVideoLink}>
                <Svg name='analytics'/>
                <Text>Скопировать ссылку на видео</Text>
            </button>
            <button className={styles.item} onClick={handleDownloadVideo}>
                <Svg name='arrowDown'/>
                <Text>Скачать</Text>
            </button>
            <button className={styles.item} onClick={handleDeleteVideo}>
                <Svg name='trash'/>
                <Text>Удалить навсегда</Text>
            </button>
        </Popover>
    )
}