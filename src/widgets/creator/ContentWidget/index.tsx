'use client'

import { FC } from "react"
import { Tabs } from "@/shared/ui/Tab"
import { VideosTable } from "@/features/creator";
import styles from "./styles.module.scss";

interface IContentWidget {
    jwt: string | undefined
    channelId: string
}

export const ContentWidget: FC<IContentWidget> = ({
    jwt,
    channelId
}) => {
    return (
        <div>
            <Tabs.Root defaultActiveTabId="videos">
            <Tabs.List classNameList={styles.tabHeader} classNameItem={styles.tabHeader_item} classNameActiveItem={styles.tabHeader_item_active}/>

            <Tabs.Tab id="videos" label="Видео">
                <VideosTable channelId={channelId} jwt={jwt}/>
            </Tabs.Tab>
            
            <Tabs.Tab id="shorts" label="Shorts">
                шортсы
            </Tabs.Tab>

            </Tabs.Root>
        </div>
    )
}