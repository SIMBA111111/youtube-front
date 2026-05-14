'use client'


import { useState } from "react"
import clsx from "clsx"

import { Modal, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider"
import { handleClearHistory } from "../lib/handleClearHistory"
import { handleStopLogHistory } from "../lib/handleStopLogHistory"

import styles from './styles.module.scss'


export type modalType = 'clearHistory' | 'dontSave' | null

export const HistorySettings = ({meId, isSaveHistory}: {meId: string, isSaveHistory: boolean}) => {
    const [openedModal, setOpenedModal] = useState<modalType>(null)
    const [historyIsSave, setHistoryIsSave] = useState<boolean>(isSaveHistory)
    const { openToast } = useToast()

    return (
        <>
            <div className={styles.historySettings}>
                <button className={styles.historySettings_btn} onClick={() => setOpenedModal('clearHistory')}>
                    <Svg name="trash" />
                    <Text size={14} weight={500} className={styles.historySettings_text}>Очистить историю просмотра</Text>
                </button> 
                <button className={styles.historySettings_btn} onClick={() => setOpenedModal('dontSave')}>
                    {historyIsSave ? (
                        <>
                            <Svg name="pause" />
                            <Text size={14} weight={500} className={styles.historySettings_text}>Не сохранять историю</Text>
                        </>
                ) : (
                    <>
                        <Svg name="playlist" />
                        <Text size={14} weight={500} className={styles.historySettings_text}>Cохранять историю</Text>
                    </>
                )}
                </button> 
            </div>
            <Modal 
                isVisible={openedModal === 'clearHistory' ? true : false} 
                setIsVisible={() => setOpenedModal(null)} 
                title='Очистить историю просмотра?' 
                isCloseButton={false}
                isOverlay
                className={styles.modal}
            >
                <Text>Влад Руднев (naaro2930@gmail.com)</Text>
                <Text color="var(--gray)">Ваша история просмотра будет удалена со всех устройств.</Text>
                <Text color="var(--gray)">Список рекомендаций будет составлен заново с учетом вашей активности в других сервисах Google. </Text>
                <div className={styles.modal_btns}>
                    <button className={clsx(styles.modal_btns_btn, styles.modal_btns_cancel)} onClick={() => setOpenedModal(null)}>
                        <Text>Отмена</Text>
                    </button>
                    <button className={clsx(styles.modal_btns_btn, styles.modal_btns_blue)} onClick={() => handleClearHistory(setOpenedModal, meId, openToast)}>
                        <Text color="#065fd4">Очистить историю просмотра</Text>
                    </button>
                </div>
            </Modal>
            <Modal 
                isVisible={openedModal === 'dontSave' ? true : false} 
                setIsVisible={() => setOpenedModal(null)} 
                title='Не сохранять историю?'
                isCloseButton={false}
                isOverlay
                className={styles.modal}
            >
                <Text>Влад Руднев (naaro2930@gmail.com)</Text>
                <Text color="var(--gray)">Ваша история просмотра перестанет сохраняться</Text>
                <Text color="var(--gray)">Список рекомендаций будет составлен заново с учетом вашей активности в других сервисах Google. </Text>
                <div className={styles.modal_btns}>
                    <button className={clsx(styles.modal_btns_btn, styles.modal_btns_cancel)} onClick={() => setOpenedModal(null)}>
                        <Text>Отмена</Text>
                    </button>
                    <button className={clsx(styles.modal_btns_btn, styles.modal_btns_blue)} onClick={() => handleStopLogHistory(setOpenedModal, meId, !historyIsSave, setHistoryIsSave)}>
                        <Text color="#065fd4">Приостановить</Text>
                    </button>
                </div>
            </Modal>        
        </>
    )
}