'use client'

import { Modal, Popover, RadioButton, Svg, Text } from "@/shared/ui"
import { handleCopyVideoURL } from "../lib/handlers"
import { useToast } from "@/app/providers/toastProvider"
import { useEffect, useState } from "react"
import { getReportReasons } from "@/shared/api/video/getReportReasons"
import styles from './styles.module.scss'
import { ReportModal } from "../modals"

interface ISettingsVideo{
    videoHash: string,
}

export const SettingsVideo: React.FC<ISettingsVideo> = ({
    videoHash
}) => {
    const [isOpenedPopover, setIsOpenedPopover] = useState<boolean>(false)
    const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false)

    const togglePopover = () => {
        if(isOpenedPopover)
            setIsOpenedPopover(false)
        else
            setIsOpenedPopover(true)
    }

    return (
        <>
            <button className={styles.settingsButton} onClick={() => togglePopover()}>
                <Svg name="verticalEllipsis"/>
            </button>
            <Popover isOpen={isOpenedPopover} onClose={() => setIsOpenedPopover(false)} offset={30} className={styles.customPopover}>
                <button className={styles.customPopover_item} onClick={() => {}} >
                    <Svg name="block"/>
                    <Text>Убрать рекламу</Text>
                </button>
                <button className={styles.customPopover_item} onClick={() => {setIsOpenedModal(true)}}>
                    <Svg name="flag"/>
                    <Text>Пожаловаться</Text>
                </button>
            </Popover>
            <ReportModal isOpenedModal={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
        </>
   )
}