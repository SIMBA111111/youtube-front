'use client'

import React, { useEffect, useState } from "react";
import { Tabs } from "@/shared/ui/Tab";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import styles from "./styles.module.scss";
import { VideoList } from "../videoList/ui";
import { ChannelVideoList } from "@/features/ChannelVideoList/ui";
import { ChannelShortVideoList } from "@/features/ChannelShortVideoList/ui";

interface IChannelTabs {
    videoList: IVideo[]
    shortVideoList: IVideo[]
    channelHash: string
}

export const ChannelTabs: React.FC<IChannelTabs> = ({
    videoList,
    shortVideoList,
    channelHash
}) => {

    return (
        <div>
            <Tabs.Root defaultActiveTabId="videos" onTabChange={(id) => console.log('Tab changed:', id)}>
                <Tabs.List />
                
                <Tabs.Tab id="videos" label="Видео">
                    <div style={{color: '#000'}}>
                        <ChannelVideoList initVideoList={videoList} channelHash={channelHash}/>
                    </div>
                </Tabs.Tab>
                
                <Tabs.Tab id="shorts" label="Shorts">
                    <ChannelShortVideoList initShortVideoList={shortVideoList} channelHash={channelHash}/>
                </Tabs.Tab>
                
                <Tabs.Tab id="playlists" label="Плейлисты">
                    <div style={{color: '#000'}}>Список плейлистов...</div>
                </Tabs.Tab>
                
                <Tabs.Tab id="community" label="Сообщество">
                    <div style={{color: '#000'}}>Посты сообщества...</div>
                </Tabs.Tab>
            </Tabs.Root>
        </div>
    )
}