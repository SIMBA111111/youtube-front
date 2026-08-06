import { FC } from "react"
import { Spinner } from "../Spinner"
import styles from './InfinityScrollLoader.module.scss'

interface IInfinityScrollLoader {
    isLoading: boolean
}

export const InfinityScrollLoader: FC<IInfinityScrollLoader> = ({
    isLoading
}) => {
    return (
        <div className={styles.spinner}>
            {isLoading && <Spinner size={32}/>}
        </div>
    )
}