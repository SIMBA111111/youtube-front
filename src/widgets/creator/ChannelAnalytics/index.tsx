'use client'

import { FC, useEffect, useRef } from "react"
import { Analytics } from "@/features/creator"
import { Tabs } from "@/shared/ui/Tab"
import styles from './styles.module.scss'
import { TabHeader } from "./TabHeader/TabHeader"

export const ChannelAnalytics: FC<{userId: string}> = ({ userId }) => {
    const labels = ['01.01', '02.01', '03.01', '04.01', '05.01', '06.01', '07.01', '08.01', '09.01', '10.01']
    const values = [7, 5, -2, 6, 8, 9, 7, 4, 5, 6]
    const min = -5
    const max = 10

    return (
        <div className={styles.channelAnalytics}>
            <Tabs.Root defaultActiveTabId="views" onTabChange={(id) => console.log('Tab changed:', id)}>
                <Tabs.List classNameList={styles.tabHeader} classNameItem={styles.tabHeader_item} classNameActiveItem={styles.tabHeader_item_active}/>
                <Tabs.Tab id="views" label={<TabHeader label="Просмотры" value="2345" />}>
                    <Analytics labels={labels} userId={userId} values={values} min={min} max={max}/>
                </Tabs.Tab>
                <Tabs.Tab id="Subscriptions" label={<TabHeader label="Подписчики" value="110" />}>
                    <Analytics labels={labels} userId={userId} values={values} min={min} max={max}/>
                </Tabs.Tab>
            </Tabs.Root>
        </div>
    )
}