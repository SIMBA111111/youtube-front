'use client'

import { IChannel } from '@/entities/channels/modal/types'
import { TabletSidebar } from './tabletSidebar'
import { DesktopSidebar } from './desktopSidebar'
import styles from './styles.module.scss'

export const SidebarContainer = ({channels}: {channels: IChannel[]}) => {
    return (
        <>
            <div className={styles.desktopSidebar}>
                <DesktopSidebar channels={channels}/>
            </div>
            <div className={styles.tabletSidebar}>
                <TabletSidebar channels={channels}/>
            </div>
        </>
    )
}