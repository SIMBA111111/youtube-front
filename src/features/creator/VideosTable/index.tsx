import { FC } from "react"
import { Tabs } from "@/shared/ui/Tab"
import styles from "./styles.module.scss";

interface IVideosTable {
    jwt: string
    channelId: string
}

export const VideosTable: FC<IVideosTable> = ({
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