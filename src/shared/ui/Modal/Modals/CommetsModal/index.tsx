import { FC, useRef, useEffect, useState, ChangeEventHandler, Dispatch, SetStateAction } from "react"
import { Text } from "@/shared/ui/Text"
import { Modal } from "../.."
import styles from './styles.module.scss'
import { Comments } from "@/widgets/Comments"
import { IChannel } from "@/entities/channels/modal/types"


interface ICommentsModal {
    isOpened: boolean
    onClose: () => void
    videoHash: string
    videoId: string
    me: IChannel
}

export const CommentsModal: FC<ICommentsModal> = ({
    isOpened,
    onClose,
    videoHash,
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
                <Comments videoHash={videoHash} videoId={videoId} me={me} />
            </div>
        </Modal>
    );
};