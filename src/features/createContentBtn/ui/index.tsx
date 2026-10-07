"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Popover, Svg, Text } from "@/shared/ui"
import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { getChannelDataClient } from "@/shared/hooks/getChannelDataClient"
import styles from './styles.module.scss'


export const CreateContentBtn = ({channelId}: {channelId: string}) => {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)
    const { openCreateModal } = useCreateVideoModal()
    const router = useRouter()
    const handleCreateVideo = async () => {
        const search = new URLSearchParams(window.location.search);
        search.set('createVideo', 'true');

        const userData = getChannelDataClient();
        const newUrl = `/creator/${userData?.id}/videos?${search.toString()}`;
        router.replace(newUrl); 
        await openCreateModal()
    }
    
    return (
        <div className={styles.create}>
            <div onClick={() => setIsOpenCreateModal(true)}>
            <div className={styles.createBtn}><Svg name='plus'/>Создать</div>
            </div>
            <Popover isOpen={isOpenCreateModal} onClose={() => setIsOpenCreateModal(false)} className={styles.customModal}>
                <div className={styles.createModal}>
                    <button onClick={handleCreateVideo} className={styles.createModal__item}>
                        <Svg name='video'/>
                        <Text weight={400} size={14}>Добавить видеоasd</Text>
                    </button>
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