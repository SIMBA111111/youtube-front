import { FC } from "react"
import { Text } from "@/shared/ui"
import styles from './styles.module.scss'

interface ITabHeader {
    label: string
    value: string
}

export const TabHeader: FC<ITabHeader> = ({
    label,
    value    
}) => {
    return (
        <div className={styles.tabHeader}>
            <Text>{label}</Text>
            <Text>{value}</Text>
        </div>
    )
}