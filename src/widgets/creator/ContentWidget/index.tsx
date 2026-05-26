'use client'

import { FC, useEffect, useState } from "react"
import { Tabs } from "@/shared/ui/Tab"
import { VideosTable } from "@/features/creator";
import styles from "./styles.module.scss";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";

interface IContentWidget {
    jwt: string
    channelId: string
    channelUsername: string
}

type TTabs = 'videos' | 'shorts'

export const ContentWidget: FC<IContentWidget> = ({
    jwt,
    channelId,
    channelUsername,
}) => {
    const [videos, setVideos] = useState<IVideo[]>([])
    const [activeTab, setActiveTab] = useState<TTabs>('videos')


    useEffect(() => {
        (async () => {
            if (activeTab === 'videos') {
                const videos = await getVideoListByChannelUsername(channelUsername, false)
                setVideos(videos.videos)
            }

            if (activeTab === 'shorts') {
                const videos = await getVideoListByChannelUsername(channelUsername, true)
                setVideos(videos.videos)
            }
        })()
    }, [activeTab])

    


    return (
        <div>
            <Tabs.Root defaultActiveTabId="videos" onTabChange={(tabId) => setActiveTab(tabId as TTabs)}>
            <Tabs.List classNameList={styles.tabHeader} classNameItem={styles.tabHeader_item} classNameActiveItem={styles.tabHeader_item_active}/>

            <Tabs.Tab id="videos" label="Видео">
                <VideosTable videos={videos}/>
            </Tabs.Tab>
            
            <Tabs.Tab id="shorts" label="Shorts">
                <VideosTable videos={videos}/>
            </Tabs.Tab>

            </Tabs.Root>
        </div>
    )
}