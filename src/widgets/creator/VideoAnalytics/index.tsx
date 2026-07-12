'use client'

import { FC, useEffect, useMemo, useRef, useState } from "react"

import { Analytics } from "@/features/creator"
import { Tabs } from "@/shared/ui/Tab"
import { AnalyticsFilter } from "@/features/creator/AnalyticsFilter/ui"
import { ANALYTICS_DATA_RANGES } from "@/shared/constants/analyticaDataRanges"
import { AnalyticsDateRange, getAnalyticsDataLabel } from "@/shared/utils/getDataRanges"
import { Text } from "@/shared/ui"
import { getVideoAnalytics } from "@/shared/api/video/admin/getVideoAnalytics"

import { TabHeader } from "../ChannelAnalytics/TabHeader/TabHeader"

import styles from './styles.module.scss'

// TO DO запрос аналитики должен возвращать примерно такой массив:
// {
//  '01.01.2026': '110'
// }
// придётся как-то на бэке считать сколько подписок и просмотров в какой день было (просто связанные таблицы взять и их updated_at смотреть)
// как минимум для этого не надо удалть объекты из таблицы subscriptions, а юзать поле deleted (наверно)

export const VideoAnalytics: FC<{videoId: string}> = ({ videoId }) => {
    const [activeDateRange, setActiveDateRange] = useState<AnalyticsDateRange>(ANALYTICS_DATA_RANGES[2])
    const [analyticData, setAnalyticData] = useState<[]>([])
    const [tabHeaderData, setTabHeaderData] = useState({})

    const fetchData = async (videoId: string, dateRange: AnalyticsDateRange) => {
        const res = await getVideoAnalytics(videoId, dateRange)
        return res
    }

    useEffect(() => {
        (async () => {
            const res = await fetchData(videoId, activeDateRange)
            
            console.log('res.result = ', res.result)

            setAnalyticData(res.result)
        })()
    }, [activeDateRange])

    const labels = useMemo(() => {
        return Object.keys(analyticData)
    }, [analyticData])

    const values = useMemo(() => {
        return Object.values(analyticData)
    }, [analyticData])

    const { min, max } = useMemo((): { min: number; max: number } => {
        let min = 0
        let max = 0

        for (let i = 0; i < labels.length; i++) {
            if (values[i] > max) max = values[i]
        }

        return { min: min, max: max + 5 }
    }, [values])

    const totalViews = useMemo(() => {
        return values.reduce((arr, i) => {
            return arr + i
        }, 0)
    }, [values])


    if (!values || !labels || !analyticData) {
        return <div>нет данных...</div>
    }

    return (
        <div className={styles.channelAnalytics}>
            <div className={styles.table}>
                <Text weight={600} size={20}>За {getAnalyticsDataLabel(activeDateRange).toLocaleLowerCase()} ваши видео набрали {totalViews} просмотров</Text>
                <div className={styles.analytics}>
                    <Tabs.Root defaultActiveTabId="views">
                        <Tabs.List classNameList={styles.tabHeader} classNameItem={styles.tabHeader_item} classNameActiveItem={styles.tabHeader_item_active}/>
                        <Tabs.Tab id="views" label={<TabHeader label="Просмотры" value={totalViews.toString()} />}>
                            <Analytics labels={labels} values={values} min={min} max={max} tab={'views'}/>
                        </Tabs.Tab>
                    </Tabs.Root>
                </div>
            </div>
            <AnalyticsFilter activeDateRange={activeDateRange} setActiveDateRange={setActiveDateRange} />
        </div>
    )
}