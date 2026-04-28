import { useEffect, useState } from 'react'

import { IChannel } from '@/entities/channels/modal/types'
import { getOneRandomShort } from '@/shared/api/video/getOneRandomShort'
import { IThumbnailShortVideo } from '@/entities/thumbnailShortVideo/modal/types'
import { getMySubsChannels } from '@/shared/api/channels/getMySubsChannels'

import { TabletSidebar } from './tabletSidebar'
import { DesktopSidebar } from './desktopSidebar'

import styles from './styles.module.scss'

export const SidebarContainer = () => {

    const [randomShortVideo, setRandomShortVideo] = useState<IThumbnailShortVideo>()
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const handleGetRandomVideo = async () => {
            const res = await getOneRandomShort()
            setRandomShortVideo(res)
        }
        (async () => {
            const channels = await getMySubsChannels()
            console.log('channels = ', channels);
            
            setChannels(channels.channels)
        })()
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