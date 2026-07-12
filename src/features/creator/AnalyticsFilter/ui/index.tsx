import { Dispatch, FC, SetStateAction, useMemo } from "react"
import { AnalyticsDateRange, getAnalyticsDataLabel } from "@/shared/utils/getDataRanges"
import { IOption, Selector } from "@/shared/ui/Selector"
import { ANALYTICS_DATA_RANGES } from "@/shared/constants/analyticaDataRanges"
import styles from './styles.module.scss'

interface IAnalyticsFilter {
    setActiveDateRange: Dispatch<SetStateAction<AnalyticsDateRange>> 
    activeDateRange: string
}

export const AnalyticsFilter: FC<IAnalyticsFilter> = ({
    activeDateRange,
    setActiveDateRange
}) => {
    const selectorOptions = useMemo(() => {
        return ANALYTICS_DATA_RANGES.map(adr => { return { value: adr, label: getAnalyticsDataLabel(adr as AnalyticsDateRange) }})
    }, [activeDateRange])

    const selectedOption = useMemo(() => {
        return {value: activeDateRange, label: getAnalyticsDataLabel(activeDateRange as AnalyticsDateRange)}
    }, [activeDateRange]) 
    
    const handleChangeActiveRahge = (option: IOption) => {
        setActiveDateRange(option.value as AnalyticsDateRange)
    }

    return (
        <div className={styles.analyticFilter}>
            <Selector options={selectorOptions} defaultValue={selectedOption} onChange={handleChangeActiveRahge}/>
        </div>
    )
}