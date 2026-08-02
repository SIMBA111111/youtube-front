'use client'

import { SidebarContainer } from "@/widgets/sidebarContainer"
import { Header } from "@/widgets/header"
import { useSidebarStore } from '@/shared/store/sidebar'
import { IChannelData } from "@/shared/utils/getChannelData"
import styles from './styles.module.scss'

interface LayoutWrapperProps {
    children: React.ReactNode
    myChannelData: IChannelData | null
}

export function PageWrapper({ children, myChannelData }: LayoutWrapperProps) {
    const {isOpen} = useSidebarStore()

    return (
        <div className={`${styles.grid} ${isOpen ? styles.gridSidebarOpen : styles.gridSidebarClosed}`} id="page-wrapper">
            <div className={styles.sidebarWrapper}>
                <SidebarContainer/>
            </div>
            
            <div className={styles.headerWrapper}>
                <Header myChannelData={myChannelData}/>
            </div>
            
            <div className={isOpen ? styles.pageWrapper_opened : styles.pageWrapper}>
                {children}
            </div>

            {isOpen && <div className={styles.sidebarOverlay}/>}
        </div>
    )
}