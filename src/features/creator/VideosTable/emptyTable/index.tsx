'use client'

import { Text } from "@/shared/ui"
import { useCreateVideoModal } from "@/shared/store/createVideoModal";
import styles from "./styles.module.scss";


export const EmptyTable = () => {
    const {isOpened, toggleCreateModal} = useCreateVideoModal()

    return (
        <div className={styles.emptyTable}>
            <Text color="var(--gray)" weight={500}>Здесь пока ничего нет.</Text>
            <button className={styles.btn} onClick={() => toggleCreateModal()}><Text color="var(--whiteText)">Добавить видео</Text></button>
        </div>
    )
}