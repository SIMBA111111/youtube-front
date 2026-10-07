import { useState } from "react";
import { useRouter } from "next/navigation";
import { Svg, Text } from "@/shared/ui";
import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { PopoverAction } from "../../popoverAction";
import styles from "../styles.module.scss";

interface IActionsPanel {
    video: IVideoFullInfo
    channelId: string
}

export const ActionsPanel = ({
    video,
    channelId
}: IActionsPanel) => {
    const [isOpenedActionPopover, setIsOpenedActionPopover] = useState<boolean>(false)
    const router = useRouter()

    const handleOpenVideoInNewTab = (videoId: string) => {
        if (video.video.isShort) 
            window.open(process.env.NEXT_PUBLIC_FRONTEND_URL + '/shorts/' + videoId, '_blank');
        else
            window.open(process.env.NEXT_PUBLIC_FRONTEND_URL + '/watch?v=' + videoId, '_blank');
    }
    
    return (
        <div className={styles.videoActions}>
            <div className={styles.videoAction} onClick={() => router.push(`/video/${video.video.id}/edit`)}>
                <Svg name="pancel"/>
                <div className={styles.notificationTooltip}>
                <Text size={14} color='var(--whiteText)' weight={300}>Сведения</Text>
                </div>
            </div>
            <div className={styles.videoAction} onClick={() => router.push(`/video/${video.video.id}/analytics`)}>
                <Svg name="analytics"/>
                <div className={styles.notificationTooltip}>
                <Text size={14} color='var(--whiteText)' weight={300}>Аналитика</Text>
                </div></div>
            <div className={styles.videoAction} onClick={() => router.push(`/video/${video.video.id}/comments`)}>
                <Svg name="comments"/>
                <div className={styles.notificationTooltip}>
                <Text size={14} color='var(--whiteText)' weight={300}>Комментарии</Text>
                </div>
            </div>
            <div className={styles.videoAction} onClick={() => handleOpenVideoInNewTab(video.video.id)}>
                <Svg name="doublePlayer"/>
                <div className={styles.notificationTooltip}>
                <Text size={14} color='var(--whiteText)' weight={300}>Видео</Text>
                </div>
            </div>
            <div className={styles.videoAction} onClick={() => setIsOpenedActionPopover(prev => !prev)}>
                <Svg name="verticalEllipsis"/>
                <div className={styles.notificationTooltip}>
                    <Text size={14} color='var(--whiteText)' weight={300}>Действия</Text>
                </div>
                <PopoverAction 
                    isOpen={isOpenedActionPopover} 
                    onClose={() => setIsOpenedActionPopover(false)} 
                    videoId={video.video.id} 
                    videoMp4Url={video.video.videoMp4Url}
                    channelId={channelId}
                />
            </div>
            </div>
    )
}