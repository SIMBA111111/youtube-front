'use client'

import { IChannel } from '@/entities/channels/modal/types'
import { getDeviceIsMobile } from '@/shared/hooks/getDeviceIsMobile'
import { TabletSidebar } from './tabletSidebar'
import { DesktopSidebar } from './desktopSidebar'


export const SidebarContainer = ({channels}: {channels: IChannel[]}) => {
    const isTablet = getDeviceIsMobile()

    return (
        <>
            {isTablet ? <TabletSidebar channels={channels}/> : <DesktopSidebar channels={channels}/>}
        </>
    )
}