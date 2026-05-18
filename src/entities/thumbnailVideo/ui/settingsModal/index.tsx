import { Modal, Popover, Svg, Text } from "@/shared/ui"
import { Dispatch, SetStateAction } from "react";
import { handleHideChannel, handleHideVideo, handleReport, handleShareVideo, handleViewLater } from "../../lib/handlers";
import { IVideo } from "../../modal/types";
import styles from "./styles.module.scss";

interface ISettigsVideoModal {
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    videoId: string
    userId: string
}

export const SettigsVideoModal: React.FC<ISettigsVideoModal> = ({
    isOpenModal,
    setIsOpenModal,
    videoId,
    userId
}) => {

    return (
        <Popover isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} className={styles.modal} offset={10}>
            <div className={styles.modalContainer}>
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleViewLater(e, videoId, userId)}>
                    <Svg name='clock'/>
                    <Text>Смотреть позже</Text>
                </div>
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleShareVideo(e, videoId, userId)}>
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
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleReport(e, videoId, userId)}>
                    <Svg name='flag'/>
                    <Text>Пожаловаться</Text>
                </div>
            </div>
        </Popover>
    )
}
