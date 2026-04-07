import { Modal, Svg, Text } from "@/shared/ui"
import { Dispatch, SetStateAction } from "react";
import { handleHideChannel, handleHideVideo, handleReport, handleShareVideo, handleViewLater } from "../../lib/handlers";
import { IVideo } from "../../modal/types";
import styles from "./styles.module.scss";

interface ISettigsVideoModal {
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
    video: IVideo
}

export const SettigsVideoModal: React.FC<ISettigsVideoModal> = ({
    isOpenModal,
    setIsOpenModal,
    video
}) => {

    return (
        <Modal isVisible={isOpenModal} setIsVisible={setIsOpenModal} isCloseButton={false} className={styles.modal}>
            <div className={styles.modalContainer}>
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleViewLater(e, video, 'user')}>
                    <Svg name='clock'/>
                    <Text>Смотреть позже</Text>
                </div>
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleShareVideo(e, video, 'user')}>
                    <Svg name='replay'/>
                    <Text>Поделиться</Text>
                </div>
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleHideVideo(e, video, 'user')}>
                    <Svg name='block'/>
                    <Text>Не интересует</Text>
                </div>
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleHideChannel(e, video, 'user')}>
                    <Svg name='brick'/>
                    <Text>Не рекомендовать видео с этого канала</Text>
                </div>
                <div className={styles.modal__item} onClick={(e: React.MouseEvent) => handleReport(e, video, 'user')}>
                    <Svg name='flag'/>
                    <Text>Пожаловаться</Text>
                </div>
            </div>
        </Modal>
    )
}
