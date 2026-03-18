'use client'

import { Svg } from '@/shared/ui'
import { CreateContentBtn, Notifications, VideoSearch } from '@/features'

import styles from './styles.module.scss'

export const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContainer__block}>
                <div className={styles.logo}><Svg name='mainLogo'/></div>
            </div>
            <div className={styles.headerContainer__block}>
                <div className={styles.searcher}>
                    <VideoSearch/>
                </div>
            </div>
            <div className={styles.headerContainer__block}>
                <CreateContentBtn/>
                <Notifications/>
                <div className={styles.myAccount}>user</div>
            </div>
        </div>
    )
}