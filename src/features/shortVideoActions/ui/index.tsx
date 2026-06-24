"use client"

import React, { useState } from 'react'

import { Svg, Text } from '@/shared/ui'
import { formatViews } from '@/shared/utils/formatViews'
import { CommentsModal } from '@/shared/ui/Modal/Modals/CommetsModal'
import styles from './styles.module.scss'

interface IShortVideoBtns {
    likeCount: number,
    dislikeCount: number,
    commentsCount: number
    videoId: string
    me: any
}  

export const ShortVideoBtns: React.FC<IShortVideoBtns> = ({ 
    dislikeCount=0, 
    likeCount=0, 
    commentsCount=0,
    videoId,
    me
}) => {
    const [isOpenedCommentModal, setIsOpenedCommentsModal] = useState<boolean>(false)
    

    return (
        <div className={styles.shortVideoBtnsContainer}>
            <div className={styles.itemWrapper}>
                <button className={styles.shortVideoBtnsContainer_item}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='like' size='big' color='white'/>
                    </div>
                    <Text className={styles.shortVideoBtnsContainer_item_text}>{formatViews(likeCount)}</Text>
                </button>
                <button className={styles.shortVideoBtnsContainer_item}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='dislike' size='big' color='white'/>
                    </div>
                    <Text className={styles.shortVideoBtnsContainer_item_text}>{formatViews(dislikeCount)}</Text>
                </button>

                <button className={styles.shortVideoBtnsContainer_item} onClick={() => setIsOpenedCommentsModal(true)}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='comments' size='big' color='white'/>
                    </div>
                    <Text className={styles.shortVideoBtnsContainer_item_text}>{formatViews(commentsCount)}</Text>
                </button>

                <button className={styles.shortVideoBtnsContainer_item}>
                    <div className={styles.shortVideoBtnsContainer_item_svg}>
                        <Svg name='share' size='big' color='white'/>
                    </div>
                    
                    <Text className={styles.shortVideoBtnsContainer_item_text}>поделиться</Text>
                </button>
            </div>

            <CommentsModal 
                isOpened={isOpenedCommentModal} 
                onClose={() => setIsOpenedCommentsModal(false)}
                me={me}    
                videoId={videoId}
            />
        </div>
    )
}