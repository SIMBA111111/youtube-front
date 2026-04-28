'use client'

import { SidebarContainer } from "@/widgets/sidebarContainer"
import { Header } from "@/widgets/header"
import { IChannel } from '@/entities/channels/modal/types'
import { useSidebarStore } from '@/shared/store/sidebar'

import styles from './styles.module.scss'
import { useEffect, useState } from "react"
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: LayoutWrapperProps) {
    const {isOpen} = useSidebarStore()

    return (
        <div className={`${styles.grid} ${isOpen ? styles.gridSidebarOpen : styles.gridSidebarClosed}`}>
            <div className={styles.sidebarWrapper}>
                <SidebarContainer/>
            </div>
            
            <div className={styles.headerWrapper}>
                <Header/>
            </div>
            
            <div className={styles.pageWrapper}>
                {children}
            </div>
        </div>
    )
}