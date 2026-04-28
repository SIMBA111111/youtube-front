'use client'

import { CommentCard, ICommentCard } from "@/entities/comments/ui"
import { Text } from "@/shared/ui"
import { useState } from "react"
import { IChannel } from "@/entities/channels/modal/types"
import styles from './styles.module.scss'

interface IAddComment {
    me: IChannel
    videoHash: string
}

export const AddComment: React.FC<IAddComment> = ({
    me,
    videoHash
}) => {
    const [inputHidden, setInputHidden] = useState<boolean>(true)

    return (
        <div>
            <div className={styles.inputContainer}>
                <img 
                    src={me?.avatarUrl ?? 'defaultImages/defaultAvatar.png'} 
                    className={styles.headerAvatar} 
                    alt="" />
                <input type="text" placeholder="Введите комментарий" className={styles.input}/>
            </div>
        </div>
    )
}