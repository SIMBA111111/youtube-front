"use client"

import { useEffect, useRef, useState } from "react"

import { BackgroundFon, Modal, Searcher, Svg, Text } from "@/shared/ui"

import styles from './styles.module.scss'
import { NotifCard } from "@/entities/notifs/ui/card/notifCard"
import { INotificationItem } from "@/entities/notifs/modal/types"
import { getNotifs } from "@/shared/api/notifications/getNotifs"
import Link from "next/link"

export const Notifications = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [notifs, setNotifs] = useState<INotificationItem[]>([])

    useEffect(() => {
        const fetchNotifs = async () => {
            try {
                const notifsData = await getNotifs()
                setNotifs(notifsData)
            } catch (error) {
                console.error('Ошибка при загрузке уведомлений:', error)
            }
        }
        
        fetchNotifs()
    }, [])

    return (
        <div className={styles.notificationsContainer}>
            <div className={styles.notifications} onClick={() => setIsOpenModal(true)}>
                <BackgroundFon bacgroundColor=''>
                    <Svg name='bell'/>
                    <div className={styles.notificationTooltip}>
                        <Text size={14} color='var(--whiteText)' weight={300}>Уведомления</Text>
                    </div>
                </BackgroundFon>
            </div>
            <Modal isVisible={isOpenModal} setIsVisible={setIsOpenModal} isCloseButton={false} isOverlay={false} className={styles.customNotifModal}>
                <div className={styles.notifModal}>
                    <div className={styles.notifModal__header}>
                        <Text weight={400}>Уведомления</Text>
                        <Link href={'/account/notifications'} className={styles.settings}>
                            <Svg name="settings"/>  
                            <div className={styles.settingsTooltip}>
                                <Text size={14} color='var(--whiteText)' weight={300}>Настройки</Text>
                            </div>
                        </Link>
                    </div>
                    
                    {notifs.length > 0 ? (
                        notifs.map((notif, index) => (
                            <NotifCard key={index} notif={notif} />
                        ))
                    ) : (
                        <Text size={16} color='var(--grayText)'>Нет уведомлений</Text>
                    )}
                </div>
            </Modal>
        </div>
    )   
}