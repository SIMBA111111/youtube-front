'use client'

import { FC, useEffect, useMemo, useRef, useState } from "react"
import { Analytics } from "@/features/creator"
import { Tabs } from "@/shared/ui/Tab"
import { AnalyticsFilter } from "@/features/creator/AnalyticsFilter/ui"
import { ANALYTICS_DATA_RANGES } from "@/shared/constants/analyticaDataRanges"
import { TabHeader } from "./TabHeader/TabHeader"
import { AnalyticsDateRange, getAnalyticsDataLabel } from "@/shared/utils/getDataRanges"
import { getChannelAnalytics, ITabHeaderData, TAnalyticEntity } from "@/shared/api/channels/getChannelAnalytics"
import { Text } from "@/shared/ui"
import styles from './styles.module.scss'

export type TTab = 'views' | 'subscriptions'


// TO DO запрос аналитики должен возвращать примерно такой массив:
// {
//  '01.01.2026': '110'
// }
// придётся как-то на бэке считать сколько подписок и просмотров в какой день было (просто связанные таблицы взять и их updated_at смотреть)
// как минимум для этого не надо удалть объекты из таблицы subscriptions, а юзать поле deleted (наверно)

export const ChannelAnalytics: FC<{userId: string}> = ({ userId }) => {
    const [activeDateRange, setActiveDateRange] = useState<AnalyticsDateRange>(ANALYTICS_DATA_RANGES[2])
    const [activeTab, setActiveTab] = useState<TTab>('views')
    const [analyticData, setAnalyticData] = useState<TAnalyticEntity>()
    const [tabHeaderData, setTabHeaderData] = useState<ITabHeaderData>()

    const fetchData = async (userId: string, dateRange: AnalyticsDateRange, tab: TTab) => {
        const res = await getChannelAnalytics(userId, dateRange, tab)
        return res
    }

    useEffect(() => {
        (async () => {
            const res = await fetchData(userId, activeDateRange, activeTab)

            if (res.error || !res.data || !res.success) {
                return {}
            }

            setAnalyticData(res.data.analyticData)
            setTabHeaderData({
                totalViews: res.data.totalViews,
                totalSubscriptions: res.data.totalSubscriptions
            })
        })()
    }, [activeDateRange, activeTab])

    // const labels = ['01.01', '02.01', '03.01', '04.01', '05.01', '06.01', '07.01', '08.01', '09.01', '10.01']
    // const values = [7, 5, -2, 6, 8, 9, 7, 4, 5, 6]
    // const min = -5
    // const max = 10

    const labels = useMemo(() => {
        return Object.keys(analyticData || {})
    }, [analyticData])

    const values = useMemo(() => {
        return Object.values(analyticData || {})
    }, [analyticData])

    const { min, max } = useMemo((): { min: number; max: number } => {
        let min = 0
        let max = 0

        for (let i = 0; i < labels.length; i++) {
            if (values[i] > max) max = values[i]
            if (activeTab === 'subscriptions')
                if (values[i] < min) min = values[i]
        }

        return { min: min ? min - 5 : min, max: max + 5 }
    }, [values])

    if (!values || !labels || !analyticData) {
        return <div>нет данных...</div>
    }

    return (
        <div className={styles.channelAnalytics}>
            <div className={styles.table}>
                <Text weight={600} size={20}>За {getAnalyticsDataLabel(activeDateRange).toLocaleLowerCase()} ваши видео набрали {tabHeaderData?.totalViews || '-'} просмотров</Text>
                <div className={styles.analytics}>
                    <Tabs.Root defaultActiveTabId="views" onTabChange={(id) => setActiveTab(id as TTab)}>
                        <Tabs.List classNameList={styles.tabHeader} classNameItem={styles.tabHeader_item} classNameActiveItem={styles.tabHeader_item_active}/>
                        <Tabs.Tab id="views" label={<TabHeader label="Просмотры" value={tabHeaderData?.totalViews.toString() || '-'} />}>
                            <Analytics labels={labels} values={values} min={min} max={max} tab={activeTab}/>
                        </Tabs.Tab>
                        <Tabs.Tab id="subscriptions" label={<TabHeader label="Подписчики" value={tabHeaderData?.totalSubscriptions.toString() || '-'} />}>
                            <Analytics labels={labels} values={values} min={min} max={max} tab={activeTab}/>
                        </Tabs.Tab>
                    </Tabs.Root>
                </div>
            </div>
            <AnalyticsFilter activeDateRange={activeDateRange} setActiveDateRange={setActiveDateRange} />
        </div>
    )
}