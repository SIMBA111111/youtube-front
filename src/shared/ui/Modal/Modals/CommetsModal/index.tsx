import { FC, useRef, useEffect, useState, ChangeEventHandler, Dispatch, SetStateAction } from "react"
import { Comments } from "@/widgets/Comments"
import { Modal } from "../.."
import { IChannelData } from "@/shared/utils/getChannelData"
import styles from './styles.module.scss'


interface ICommentsModal {
    isOpened: boolean
    onClose: () => void
    videoId: string
    me: IChannelData | null
    commentsCount: number
}

export const CommentsModal: FC<ICommentsModal> = ({
    isOpened,
    onClose,
    videoId,
    me,
    commentsCount
}) => {
    return (
        <Modal 
            isVisible={isOpened} 
            setIsVisible={onClose} 
            className={styles.modal} 
            isOverlay={true}
        >
            <div className={styles.container}>
                <Comments commentCount={commentsCount} videoId={videoId} me={me} />
            </div>
        </Modal>
    );
};