"use client"

import Link from "next/link";
import { useState } from "react";

import { getFormatRelativeTime } from "@/shared/utils/getElapsedTime";
import { Popover, Svg, Text } from "@/shared/ui";
import { useToast } from "@/app/providers/toastProvider";
import { INotifExtendInfo } from "@/shared/api/notifications/getNotifs";

import { handleHideNotif } from "../../lib/handleHideNotif";
import { handleOffNotifByChannel } from "../../lib/handleOffNotifByChannel";
import styles from './styles.module.scss'
import { updateNotifView } from "@/shared/api/notifications/updateNotifView";
import { useRouter } from "next/navigation";


interface INotifCard {
    notif: INotifExtendInfo
}

export const NotifCard: React.FC<INotifCard> = ({notif}) => {
    
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isViewed, setIsViewed] = useState<boolean>(notif.viewed)
    const router = useRouter()
    const { openToast } = useToast()
    
    const linkToVideo = notif.isShort ? `/shorts/${notif.videoId}` : `/watch?v=${notif.videoId}`

    const handleSettingsClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Предотвращает переход по ссылке
        e.stopPropagation(); // Останавливает всплытие события
        setIsOpenModal(true);
    }

    const hadleNotifClick = async () => {
        const res = await updateNotifView(notif.id)
        if (res.data && !res.error && res.success) {
            setIsViewed(res.data)
            router.push(linkToVideo)
        }
    }

    return (
        <>
            <div onClick={hadleNotifClick} className={styles.notifCard}>
                {!isViewed && <div className={styles.unreadIndicator} />}
                
                <img 
                    src={notif.avatarUrl} 
                    alt={notif.channelName} 
                    className={styles.channelAvatar}
                />
                
                <div className={styles.contentContainer}>
                    <div className={styles.title}>
                        <Text size={14} weight={400}>
                            Для вас: {notif.channelName}
                        </Text>
                    </div>
                    <div className={styles.time}>
                        {getFormatRelativeTime(notif.createdDate)}
                    </div>
                </div>
                
                <img 
                    src={notif.thumbnailUrl} 
                    alt="Video preview" 
                    className={styles.videoPreview}
                />
                
                {/* Кнопка с обработчиком */}
                <div onClick={handleSettingsClick} className={styles.settingsButton}>
                    <Svg name="verticalEllipsis"/>
                </div>
            </div>

            <Popover isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} className={styles.modal}>
                <div className={styles.notifSettings} onMouseOver={(e: any) => e.stopPropagation()}>
                    <div className={styles.notifSettings__item} onClick={() => handleHideNotif({id:notif.id, openToast})}>
                        <Svg name="crossedEye"/>
                        <Text weight={400}>Скрыть уведомление</Text>
                    </div>
                    <div className={styles.notifSettings__item} onClick={() => handleOffNotifByChannel({id: notif.id, channel: notif.channelName, openToast})}>
                        <Svg name="crossedBell"/>
                        <Text weight={400}>Отключить все уведомления о канале "{notif.channelName}"</Text>
                    </div>
                </div>
            </Popover>
        </>
    )
}