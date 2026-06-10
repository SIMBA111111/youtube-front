import { FC } from "react";
import styles from "./styles.module.scss";
import { Popover } from "@/shared/ui";


interface ICreatorCommentSettingPopover {
    isOpened: boolean
    onClose: () => void
}

export const CreatorCommentSettingPopover: FC<ICreatorCommentSettingPopover> = ({
    isOpened,
    onClose
}) => {
    return (
        <Popover isOpen={isOpened} onClose={onClose} className={styles.popoverContainer}>
            <button className={styles.btn}>Закрепить</button>
            <button className={styles.btn}>Удалить</button>
            <button className={styles.btn}>Пожаловаться</button>
        </Popover>
    )
}