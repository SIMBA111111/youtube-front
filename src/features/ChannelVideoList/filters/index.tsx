import { FC } from "react"
import { Text } from "@/shared/ui";
import { FiltersEnum, filterType } from "../ui"
import styles from "./styles.module.scss";

interface IFilter {
    activeFilter: filterType,
    changeFilterAndRefresh: (newFilter: filterType) => void
}

export const ChannelVideosFilter: FC<IFilter> = ({
activeFilter,
changeFilterAndRefresh
}) => (
    <div className={styles.filter}>
        <button className={activeFilter === FiltersEnum.NEWS ? styles.filter_button_active : styles.filter_button} onClick={() => changeFilterAndRefresh(FiltersEnum.NEWS)}>
            <Text color={activeFilter === FiltersEnum.NEWS ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Новые</Text>
        </button>
        <button className={activeFilter === FiltersEnum.FAME ? styles.filter_button_active : styles.filter_button} onClick={() => changeFilterAndRefresh(FiltersEnum.FAME)}>
            <Text color={activeFilter === FiltersEnum.FAME ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Популярные</Text>
        </button>
        <button className={activeFilter === FiltersEnum.OLD ? styles.filter_button_active : styles.filter_button} onClick={() => changeFilterAndRefresh(FiltersEnum.OLD)}>
            <Text color={activeFilter === FiltersEnum.OLD ? "var(--whiteText)" : "var(--blackText)"} weight={500} size={14}>Старые</Text>
        </button>
    </div>
)