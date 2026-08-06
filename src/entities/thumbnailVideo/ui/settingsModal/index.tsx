'use client'

import { Modal, Popover, Svg, Text } from "@/shared/ui"
import { Dispatch, SetStateAction, useState } from "react";
import { handleHideChannel, handleHideVideo, handleReport, handleShareVideo, handleViewLater } from "../../lib/handlers";
import { IVideo } from "../../modal/types";
import styles from "./styles.module.scss";
import { useToast } from "@/app/providers/toastProvider";
import { ReportModal } from "@/features/videoDescription/settingsVideo/modals";
import { UnauthReportModal } from "@/shared/ui/Modal/Modals/UnauthReportModal";

interface ISettigsVideoModal {
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    videoId: string
    videoHash: string
    userId: string
}

export const SettigsVideoModal: React.FC<ISettigsVideoModal> = ({
    isOpenModal,
    setIsOpenModal,
    videoId,
    videoHash,
    userId
}) => {
    const [isOpenedReportModal, setIsOpenedReportModal] = useState<boolean>(false)
    const { openToast } = useToast()
    

    return (
        <>
            <Popover isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} className={styles.modal} offset={25}>
                <div className={styles.modalContainer}>
                    <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleViewLater(e, videoId, userId)}>
                        <Svg name='clock'/>
                        <Text>Смотреть позже</Text>
                    </div>
                    <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleShareVideo(e, videoHash, userId, openToast)}>
                        <Svg name='replay'/>
                        <Text>Поделиться</Text>
                    </div>
                    <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleHideVideo(e, videoId, userId)}>
                        <Svg name='block'/>
                        <Text>Не интересует</Text>
                    </div>
                    <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleHideChannel(e, videoId, userId)}>
                        <Svg name='brick'/>
                        <Text>Не рекомендовать видео с этого канала</Text>
                    </div>
                    <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleReport(e, setIsOpenedReportModal )}>
                        <Svg name='flag'/>
                        <Text>Пожаловаться</Text>
                    </div>
                </div>
            </Popover>
            {!userId && <UnauthReportModal isVisibleModal={isOpenedReportModal} setIsVisibleModal={setIsOpenedReportModal} />}
            {userId && <ReportModal isOpenedModal={isOpenedReportModal} setIsOpenedModal={setIsOpenedReportModal} />}
        </>
    )
}
