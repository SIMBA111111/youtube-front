"use client"

import React, { useState } from 'react'

import styles from './styles.module.scss'
import { Svg } from '@/shared/ui'
import { formatViews } from '@/shared/utils/formatViews'
import { CommentsModal } from '@/shared/ui/Modal/Modals/CommetsModal'

interface IShortVideoBtns {
    likeCount: number,
    dislikeCount: number,
    commentsCount: number
    videoHash: string
    me: any
}  

export const ShortVideoBtns: React.FC<IShortVideoBtns> = ({ 
    dislikeCount=0, 
    likeCount=0, 
    commentsCount=0,
    videoHash,
    me
}) => {
    const [isOpenedCommentModal, setIsOpenedCommentsModal] = useState<boolean>(false)

    const handleLike = () => {

    }

    const handleDislike = () => {
        
    }

    const handleCopyVideoUrl = () => {
        
    }

    return (
        <div className={styles.shortVideoBtnsContainer}>
            <div className={styles.itemWrapper}>
                <button className={styles.shortVideoBtnsContainer_item}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='like' size='big'/>
                    </div>
                    <div className={styles.shortVideoBtnsContainer_item_text}>{formatViews(likeCount)}</div>
                </button>
                <button className={styles.shortVideoBtnsContainer_item}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='dislike' size='big'/>
                    </div>
                    <div className={styles.shortVideoBtnsContainer_item_text}>{formatViews(dislikeCount)}</div>
                </button>

                <button className={styles.shortVideoBtnsContainer_item} onClick={() => setIsOpenedCommentsModal(true)}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='comments' size='big'/>
                    </div>
                    <div className={styles.shortVideoBtnsContainer_item_text}>{formatViews(commentsCount)}</div>
                </button>

                <button className={styles.shortVideoBtnsContainer_item}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='share' size='big'/>
                    </div>
                    
                    <div className={styles.shortVideoBtnsContainer_item_text}>поделиться</div>
                </button>
            </div>

            <CommentsModal 
                isOpened={isOpenedCommentModal} 
                onClose={() => setIsOpenedCommentsModal(false)}
                videoHash={videoHash}
                me={me}    
            />
        </div>
    )
}