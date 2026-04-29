'use client'

import clsx from "clsx"
import { CommentCard, ICommentCard } from "@/entities/comments/ui"
import { Svg, Text } from "@/shared/ui"
import { RefObject, useRef, useState } from "react"
import { IChannel } from "@/entities/channels/modal/types"
import { handleCreateComment } from "../lib/createComment"
import styles from './styles.module.scss'
import { useToast } from "@/app/providers/toastProvider"

interface IAddComment {
    me: IChannel
    videoId: string
}

export const AddComment: React.FC<IAddComment> = ({
    me,
    videoId
}) => {
    const [inputHidden, setInputHidden] = useState<boolean>(true)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const {openToast} = useToast()

    const handleCancel = () => {
        console.log('handleCancel');
        
        setInputHidden(true)
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <div className={styles.container}>
            <img 
                src={me?.avatarUrl ?? 'defaultImages/defaultAvatar.png'} 
                className={inputHidden ? styles.headerAvatar : styles.headerAvatarBig} 
                alt=""
            />
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    placeholder="Введите комментарий" 
                    className={clsx(styles.input, {[styles.active]: !inputHidden})} 
                    onClick={() => setInputHidden(false)}
                    onChange={(e) => inputRef.current!.value = e.target.value}
                    ref={inputRef}
                />
                {!inputHidden && <div className={styles.actions}>
                    <Svg name="block"/>
                    <div className={styles.actions_btns}>
                        <button onClick={() => handleCancel()} className={styles.actions_btns_1}><Text>Отмена</Text></button>
                        <button 
                            onClick={() => handleCreateComment(inputRef.current?.value, videoId, me.id, setInputHidden, inputRef, openToast)} 
                            className={styles.actions_btns_2}
                        >
                           <Text color="var(--whiteText)">Оставить комментарий</Text>
                        </button>
                    </div>
                </div>}
            </div>

        </div>
    )
}