"use client"

import { useEffect, useRef, useState } from "react"

import { BackgroundFon, Modal, Popover, Searcher, Svg, Text } from "@/shared/ui"

import styles from './styles.module.scss'
import Link from "next/link"


export const CreateContentBtn = ({channelId}: {channelId: string}) => {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
    
    return (
        <div className={styles.create} onClick={() => setIsOpenCreateModal(true)}>
            <BackgroundFon>
                <div className={styles.createBtn}><Svg name='plus'/>Создать</div>
            </BackgroundFon>
            <Popover isOpen={isOpenCreateModal} onClose={() => setIsOpenCreateModal(false)} className={styles.customModal}>
                <div className={styles.createModal}>
                    <Link href={`/creator/${channelId}/videos?createVideo=true`} className={styles.createModal__item}>
                        <Svg name='video'/>
                        <Text weight={400} size={14}>Добавить видео</Text>
                    </Link>
                    <Link href={'/channel/hash/livestreaming'} className={styles.createModal__item}>
                        <Svg name='broadcast'/>
                        <Text weight={400} size={14}>Начать трансляцию</Text>
                    </Link>
                    <Link href={'/channel/hash/posts'} className={styles.createModal__item}>
                        <Svg name='writing'/>
                        <Text weight={400} size={14}>Создать запись</Text>
                    </Link>
                </div>
            </Popover>
        </div>
    )
}