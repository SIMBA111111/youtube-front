'use client'

import { FC, useEffect, useState } from "react"
import { Tabs } from "@/shared/ui/Tab"
import { VideosTable } from "@/features/creator";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import styles from "./styles.module.scss";
import { FiltersEnum } from "@/features/ChannelVideoList/ui";
import { CreateVideoModal } from "@/features/CreateVideoModal";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateVideoModal } from "@/shared/store/createVideoModal";


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
    const {isOpened, toggleCreateModal, openCreateModal} = useCreateVideoModal()
    
    const [videos, setVideos] = useState<IVideo[]>([])
    const [activeTab, setActiveTab] = useState<TTabs>('videos')
    const [filter, setFilter] = useState<keyof typeof FiltersEnum>('NEWS')
    const searchParams = useSearchParams();

    useEffect(() => {
        const isOpenCreateVideoModal = searchParams.get('createVideo')
        
        if (isOpenCreateVideoModal == 'true') {
            openCreateModal()
        }
    }, [])

    useEffect(() => {
        (async () => {
            if (activeTab === 'videos') {
                const videos = await getVideoListByChannelUsername(channelUsername, false, filter)
                setVideos(videos.videos)
            }

            if (activeTab === 'shorts') {
                const videos = await getVideoListByChannelUsername(channelUsername, true, filter)
                setVideos(videos.videos)
            }
        })()
    }, [activeTab, filter])

    const handleFilter = () => {
        filter === FiltersEnum.NEWS ? setFilter(FiltersEnum.OLD) : setFilter(FiltersEnum.NEWS)
    }

    return (
        <div>
            <Tabs.Root defaultActiveTabId="videos" onTabChange={(tabId) => setActiveTab(tabId as TTabs)}>
            <Tabs.List classNameList={styles.tabHeader} classNameItem={styles.tabHeader_item} classNameActiveItem={styles.tabHeader_item_active}/>

            <Tabs.Tab id="videos" label="Видео">
                <VideosTable videos={videos} filter={filter} handleFilter={handleFilter} channelId={channelId}/>
            </Tabs.Tab>
            
            <Tabs.Tab id="shorts" label="Shorts">
                <VideosTable videos={videos} filter={filter} handleFilter={handleFilter} channelId={channelId}/>
            </Tabs.Tab>

            </Tabs.Root>
            <CreateVideoModal/>
        </div>
    )
}