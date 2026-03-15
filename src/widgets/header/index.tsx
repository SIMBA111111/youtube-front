'use client'

import { Svg, BackgroundFon, Text, Modal } from '@/shared/ui'
import { VideoSearch } from '@/features'

import styles from './styles.module.scss'
import { useState } from 'react'
import Link from 'next/link'

export const Header = () => {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false)

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContainer__block}>
                <div className={styles.sidebarBtn}><Svg name='burger'/></div>
                <div className={styles.logo}><Svg name='mainLogo'/></div>
            </div>
            <div className={styles.headerContainer__block}>
                <div className={styles.searcher}>
                    <VideoSearch/>
                </div>
            </div>
            <div className={styles.headerContainer__block}>
                <div className={styles.create} onClick={() => setIsOpenCreateModal(true)}>
                    <BackgroundFon>
                        <div className={styles.createBtn}><Svg name='plus'/>Создать</div>
                    </BackgroundFon>
                    <Modal isVisible={isOpenCreateModal} setIsVisible={setIsOpenCreateModal} isCloseButton={false}>
                        <div className={styles.createModal}>
                            <Link href={'/channel/hash/videos/upload'} className={styles.createModal__item}>
                                <Svg name='video'/>
                                <Text>Добавить видео</Text>
                            </Link>
                            <Link href={'/channel/hash/livestreaming'} className={styles.createModal__item}>
                                <Svg name='broadcast'/>
                                <Text>Начать трансляцию</Text>
                            </Link>
                            <Link href={'/channel/hash/posts'} className={styles.createModal__item}>
                                <Svg name='writing'/>
                                <Text>Создать запись</Text>
                            </Link>
                        </div>
                    </Modal>
                </div>
                <BackgroundFon bacgroundColor=''>
                    <div className={styles.notifications}><Svg name='bell'/></div>
                </BackgroundFon>
                
                <div className={styles.myAccount}>user</div>
            </div>
        </div>
    )
}