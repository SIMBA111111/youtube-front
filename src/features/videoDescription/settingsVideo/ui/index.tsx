'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import { Modal, Popover, RadioButton, Svg, Text } from "@/shared/ui"
import { handleCopyVideoURL } from "../lib/handlers"
import { useToast } from "@/app/providers/toastProvider"
import { getReportReasons } from "@/shared/api/reports/getReportReasons"
import { ReportModal } from "../modals"
import styles from './styles.module.scss'
import { UnauthReportModal } from "@/shared/ui/Modal/Modals/UnauthReportModal"
import { getChannelDataClient } from "@/shared/hooks/getChannelDataClient"

interface ISettingsVideo{
    videoId: string,
}

export const SettingsVideo: React.FC<ISettingsVideo> = ({
    videoId
}) => {
    const [isOpenedPopover, setIsOpenedPopover] = useState<boolean>(false)
    const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false)

    const userData = getChannelDataClient()

    const togglePopover = () => {
        if(isOpenedPopover)
            setIsOpenedPopover(false)
        else
            setIsOpenedPopover(true)
    }

    const handleOpenReportModal = () => {
        setIsOpenedModal(true)
        setIsOpenedPopover(false)
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
                <button className={styles.customPopover_item} onClick={() => {handleOpenReportModal()}}>
                    <Svg name="flag"/>
                    <Text>Пожаловаться</Text>
                </button>
            </Popover>
            {!userData && <UnauthReportModal isVisibleModal={isOpenedModal} setIsVisibleModal={setIsOpenedModal} />}
            <ReportModal isOpenedModal={isOpenedModal} setIsOpenedModal={setIsOpenedModal} />
        </>
   )
}