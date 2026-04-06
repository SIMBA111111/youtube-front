"use client"

import { useState } from "react"
import { Accordion, Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import { formatDate } from "@/shared/utils/formatDate"
import { getCommentsByVideoHash } from "@/shared/api/comments/getCommentsByVideoHash"
import { getRepliesCommentsById } from "@/shared/api/comments/getRepliesCommentsById"
import styles from './styles.module.scss'

export interface ICommentCard {
    id: string
    comment: string
    likes: number
    dislikes: number
    datePublication: string
    channel: {
        id: string
        username: string
        avatarUrl?: string
    }
    video: {
        id: string
    }
    isReplyTo: string
    relatedCommentsCount: number 
}

export const CommentCard: React.FC<ICommentCard> = ({
    id,
    comment,
    likes,
    dislikes,
    datePublication,
    channel,
    video,
    isReplyTo,
    relatedCommentsCount
}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)
    const [likesCount, setLikesCount] = useState(likes)
    const [dislikesCount, setDislikesCount] = useState(dislikes)
    const [showReplies, setShowReplies] = useState(false)
    const [relatedComments, setRelatedComments] = useState<any>([])

    const handleLike = () => {
        if (isLiked) {
            setLikesCount(likesCount - 1)
            setIsLiked(false)
        } else {
            setLikesCount(likesCount + 1)
            setIsLiked(true)
            if (isDisliked) {
                setDislikesCount(dislikesCount - 1)
                setIsDisliked(false)
            }
        }
    }

    const handleDislike = () => {
        if (isDisliked) {
            setDislikesCount(dislikesCount - 1)
            setIsDisliked(false)
        } else {
            setDislikesCount(dislikesCount + 1)
            setIsDisliked(true)
            if (isLiked) {
                setLikesCount(likesCount - 1)
                setIsLiked(false)
            }
        }
    }

    const handleShowReplies = async () => {
        // const res = await getCommentsByVideoHash('sadfasdf')
        const res = await getRepliesCommentsById('sadfasdf')
        setRelatedComments(res)
        setShowReplies(true)
    }

    return (
        <div className={styles.comment}>
            <div className={styles.comment_avatar}>
                {channel.avatarUrl ? (
                    <img src={channel.avatarUrl} alt={channel.username} />
                ) : (
                    <div className={styles.avatar_placeholder}>
                        {channel.username?.[0]?.toUpperCase()}
                    </div>
                )}
            </div>

            <div className={styles.comment_content}>
                <div className={styles.comment_header}>
                    <Text className={styles.comment_username} weight={600}>
                        {channel.username}
                    </Text>
                    <Text size={12} color="var(--grayText)">
                        {formatDate(datePublication)}
                    </Text>
                </div>

                <div className={styles.comment_text}>
                    <Text>{comment}</Text>
                </div>

                <div className={styles.comment_actions}>
                    <button 
                        className={`${styles.action_btn} ${isLiked ? styles.active : ''}`}
                        onClick={handleLike}
                    >
                        <Svg name="like" />
                        <Text size={12} className={styles.action_btn_text}>{formatViews(likesCount)}</Text>
                    </button>

                    <button 
                        className={`${styles.action_btn} ${isDisliked ? styles.active : ''}`}
                        onClick={handleDislike}
                    >
                        <Svg name="dislike" />
                        <Text size={12} className={styles.action_btn_text}>{formatViews(dislikesCount)}</Text>
                    </button>

                    <button className={styles.reply_btn}>
                        <Text size={14} weight={500}>Ответить</Text>
                    </button>
                </div>

                {relatedCommentsCount > 0 && (
                    <Accordion 
                         header={
                            !showReplies && <button className={styles.show_replies_btn} onClick={() => handleShowReplies()}>
                                <Text size={14}>
                                    {`${formatViews(relatedCommentsCount)} ответ${relatedCommentsCount % 10 === 1 && relatedCommentsCount !== 11 ? '' : 'ов'}`}
                                </Text>
                                <Svg name="shortArrowDown" />
                            </button>
                        }
                        footer={
                            <button className={styles.show_replies_btn} onClick={() => setShowReplies(false)}>
                                <Text size={14}>Скрыть ответы</Text>
                                <Svg name="shortArrowUp" />
                            </button>
                        }
                    >
                        <div className={styles.comments_comments}>
                            {relatedComments.map((comment: ICommentCard) => (
                                <CommentCard                         
                                    key={comment.id}
                                    id={comment.id}
                                    channel={comment.channel}
                                    video={video}
                                    dislikes={comment.dislikes}
                                    likes={comment.likes}
                                    comment={comment.comment}   
                                    datePublication={comment.datePublication}
                                    relatedCommentsCount={comment.relatedCommentsCount}
                                    isReplyTo={isReplyTo}
                                />
                            ))}
                        </div>
                    </Accordion>
                )}
            </div>
        </div>
    )
}