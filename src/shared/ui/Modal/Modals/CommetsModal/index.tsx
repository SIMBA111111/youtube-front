import { FC, useRef, useEffect, useState, ChangeEventHandler, Dispatch, SetStateAction } from "react"
import { Text } from "@/shared/ui/Text"
import { Comments } from "@/widgets/Comments"
import { IChannel } from "@/entities/channels/modal/types"
import { Modal } from "../.."
import styles from './styles.module.scss'


interface ICommentsModal {
    isOpened: boolean
    onClose: () => void
    videoId: string
    me: IChannel
}

export const CommentsModal: FC<ICommentsModal> = ({
    isOpened,
    onClose,
    videoId,
    me
}) => {
    return (
        <Modal 
            isVisible={isOpened} 
            setIsVisible={onClose} 
            className={styles.modal} 
            isOverlay={true}
        >
            <div className={styles.container}>
                <Comments videoId={videoId} me={me} />
            </div>
        </Modal>
    );
};