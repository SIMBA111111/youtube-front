import { useEffect, useState } from 'react'

import { IChannel } from '@/entities/channels/modal/types'
import { getOneRandomShort } from '@/shared/api/video/getOneRandomShort'

import { TabletSidebar } from './tabletSidebar'
import { DesktopSidebar } from './desktopSidebar'
import { IThumbnailShortVideo } from '@/entities/thumbnailShortVideo/modal/types'
import styles from './styles.module.scss'

export const SidebarContainer = ({channels}: {channels: IChannel[]}) => {

    const [randomShortVideo, setRandomShortVideo] = useState<IThumbnailShortVideo>()

    useEffect(() => {
        const handleGetRandomVideo = async () => {
            const res = await getOneRandomShort()
            setRandomShortVideo(res)
        }
        handleGetRandomVideo()
    }, [])

    return (
        <>
            <div className={styles.desktopSidebar}>
                <DesktopSidebar channels={channels} randomShortVideo={randomShortVideo}/>
            </div>
            <div className={styles.tabletSidebar}>
                <TabletSidebar channels={channels} randomShortVideo={randomShortVideo}/>
            </div>
        </>
    )
}