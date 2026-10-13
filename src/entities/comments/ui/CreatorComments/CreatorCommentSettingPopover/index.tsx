import { FC } from "react";
import { Popover } from "@/shared/ui";
import { attachComment, deleteComment } from "@/shared/api/comments/deleteComment";
import styles from "./styles.module.scss";


interface ICreatorCommentSettingPopover {
    isOpened: boolean
    onClose: () => void
    commentId: string
    videoId: string
    refreshData: () => void
}

export const CreatorCommentSettingPopover: FC<ICreatorCommentSettingPopover> = ({
    isOpened,
    onClose,
    commentId,
    videoId,
    refreshData
}) => {
    const handleDeleteComment = async () => {
        await deleteComment(commentId, videoId)
        await refreshData()
    }

    const handleAttachComment = async () => {
        await attachComment(commentId, videoId)
        await refreshData()
    }

    return (
        <Popover isOpen={isOpened} onClose={onClose} offset={20} className={styles.popoverContainer}>
            <button className={styles.btn} onClick={() => handleAttachComment()}>Закрепить</button>
            <button className={styles.btn} onClick={() => handleDeleteComment()}>Удалить</button>
            <button className={styles.btn}>Пожаловаться</button>
        </Popover>
    )
}