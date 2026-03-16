"use client"

import { useEffect, useRef, useState } from "react"

import { BackgroundFon, Modal, Searcher, Svg, Text } from "@/shared/ui"

import styles from './styles.module.scss'
import Link from "next/link"


export const Notifications = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    
    return (
        <div className={styles.notificationsContainer}>
            <div className={styles.notifications}>
                <BackgroundFon bacgroundColor=''>
                    <Svg name='bell'/>
                    <div className={styles.notificationTooltip}>
                        <Text size={14} color='var(--whiteText)' weight={300}>Уведомления</Text>
                    </div>
                </BackgroundFon>
            </div>
                <Modal isVisible={isOpenModal} setIsVisible={setIsOpenModal} isCloseButton={false} isOverlay={false}>
                    <div className={styles.notifModal}>
                    </div>
                </Modal>
        </div>
    )   
}