"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { getFormatRelativeTime } from "@/shared/utils/getElapsedTime";
import { Popover, Svg, Text } from "@/shared/ui";
import { useToast } from "@/app/providers/toastProvider";
import { INotifExtendInfo } from "@/shared/api/notifications/getNotifs";
import { updateNotifView } from "@/shared/api/notifications/updateNotifView";

import { handleHideNotif } from "../../lib/handleHideNotif";
import { handleOffNotifByChannel } from "../../lib/handleOffNotifByChannel";
import styles from './styles.module.scss'


interface INotifCard {
    notif: INotifExtendInfo
    setUnviewedNotifscount: Dispatch<SetStateAction<number>>
    handleDeleteNotif: (notifId: string) => void
}

export const NotifCard: React.FC<INotifCard> = ({
    notif, 
    setUnviewedNotifscount,
    handleDeleteNotif
}) => {
    
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
            setUnviewedNotifscount(prev => prev - 1)
            window.open(linkToVideo, '_blank')
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
                <div data-popover-ignore className={styles.notifSettings}>
                    <div className={styles.notifSettings__item} onClick={() => handleHideNotif({id:notif.id, openToast, handleDeleteNotif})}>
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