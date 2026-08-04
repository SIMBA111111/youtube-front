'use client'

import { Tabs } from "@/shared/ui/Tab";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ChannelVideoList } from "@/features/ChannelVideoList/ui";
import { ChannelShortVideoList } from "@/features/ChannelShortVideoList/ui";
import { ChannelPlaylists } from "@/features/ChannelPlaylists/ui";
import { IPlaylist } from "@/entities/playlist/ui";
import styles from "./styles.module.scss";

interface IChannelTabs {
    videoList: IVideo[]
    shortVideoList: IVideo[]
    playlists: IPlaylist[]
    channelUsername: string
}

export const ChannelTabs: React.FC<IChannelTabs> = ({
    videoList,
    shortVideoList,
    playlists,
    channelUsername
}) => {

    return (
        <div>
            <Tabs.Root defaultActiveTabId="videos" onTabChange={(id) => console.log('Tab changed:', id)}>
                <Tabs.List classNameList={styles.tabHeader} classNameItem={styles.tabHeader_item} classNameActiveItem={styles.tabHeader_item_active}/>
                
                {/* <Tabs.Tab id="main" label="Главная" className={styles.tabHeader_item}>
                    <ChannelMainTab communityPosts={communityPosts} playlists={playlists} videoList={videoList} channelHash={channelHash}/>
                </Tabs.Tab> */}

                <Tabs.Tab id="videos" label="Видео">
                    <ChannelVideoList initVideoList={videoList} channelUsername={channelUsername}/>
                </Tabs.Tab>
                
                <Tabs.Tab id="shorts" label="Шортсы">
                    <ChannelShortVideoList initShortVideoList={shortVideoList} channelUsername={channelUsername}/>
                </Tabs.Tab>
                
                <Tabs.Tab id="playlists" label="Плейлисты">
                    <ChannelPlaylists playlists={playlists} />
                </Tabs.Tab>
            </Tabs.Root>
        </div>
    )
}