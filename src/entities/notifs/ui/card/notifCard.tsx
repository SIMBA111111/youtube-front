"use client"

import Link from "next/link";
import { INotifCard, INotificationItem } from "../../modal/types";

import styles from './styles.module.scss'
import { getFormatRelativeTime } from "@/shared/utils/getElapsedTime";
import { BackgroundFon, Modal, Svg, Text } from "@/shared/ui";
import { useState } from "react";
import { handleHideNotif } from "../../lib/handleHideNotif";
import { handleOffNotifByChannel } from "../../lib/handleOffNotifByChannel";
import { useToast } from "@/app/providers/toastProvider";


export const NotifCard: React.FC<INotifCard> = ({notif}) => {
    const { id, video, channel, createdAt, isViewed } = notif
    
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    
    const { openToast } = useToast()
    
    const linkToVideo = video.isShort ? `/shorts/${video.videoHash}` : `/watch/${video.videoHash}`

    const handleSettingsClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Предотвращает переход по ссылке
        e.stopPropagation(); // Останавливает всплытие события
        setIsOpenModal(true);
    }

    return (
        <>
            <Link href={linkToVideo} className={styles.notifCard}>
                {!isViewed && <div className={styles.unreadIndicator} />}
                
                <img 
                    src={channel.avatarUrl} 
                    alt={channel.name} 
                    className={styles.channelAvatar}
                />
                
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        <Text size={14} weight={400}>
                            Для вас: {channel.name}
                        </Text>
                    </div>
                    <div className={styles.time}>
                        {getFormatRelativeTime(createdAt)}
                    </div>
                </div>
                
                <img 
                    src={video.previewUrl} 
                    alt="Video preview" 
                    className={styles.videoPreview}
                />
                
                {/* Кнопка с обработчиком */}
                <div onClick={handleSettingsClick} className={styles.settingsButton}>
                    <BackgroundFon bacgroundColor="" backgroundHoverColor="lightGray">
                        <Svg name="verticalEllipsis"/>
                    </BackgroundFon>
                </div>
            </Link>

            <Modal isVisible={isOpenModal} setIsVisible={setIsOpenModal} isCloseButton={false} isOverlay={false} className={styles.modal}>
                <div className={styles.notifSettings} onMouseOver={(e: any) => e.stopPropagation()}>
                    <div className={styles.notifSettings__item} onClick={() => handleHideNotif({id, openToast})}>
                        <Svg name="crossedEye"/>
                        <Text weight={400}>Скрыть уведомление</Text>
                    </div>
                    <div className={styles.notifSettings__item} onClick={() => handleOffNotifByChannel({id, channel, openToast})}>
                        <Svg name="crossedBell"/>
                        <Text weight={400}>Отключить все уведомления о канале "{channel.name}"</Text>
                    </div>
                </div>
            </Modal>
        </>
    )
}