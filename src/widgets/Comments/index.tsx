'use client'

import { CommentCard, ICommentCard } from "@/entities/comments/ui"
import { AddComment, CommentFilter } from "@/features"
import { useState } from "react"
import styles from "./styles.module.scss";

interface IComments {
    videoComments: ICommentCard[]
}

export type commentFilter = 'famous' | "new"

export interface IFilter {
    id: string
    value: commentFilter
}


export const Comments: React.FC<IComments> = ({
    videoComments
}) => {
    const [filter, setFilter] = useState<IFilter>({
        id: '1',
        value: 'famous'
    })

    return (
        <div className={styles.comments}>
            <div className={styles.comments_header}>
                <h2>{videoComments.length} комментария</h2>
                <CommentFilter filter={filter} setFilter={setFilter}/>
            </div>
            <AddComment/>
            <div className={styles.comments_comments}>
                {videoComments.map((comment: ICommentCard) => (
                    <CommentCard                         
                        key={comment.id}
                        id={comment.id}
                        channel={comment.channel}
                        video={comment.video}
                        dislikes={comment.dislikes}
                        likes={comment.likes}
                        comment={comment.comment}   
                        datePublication={comment.datePublication}
                        relatedCommentsCount={comment.relatedCommentsCount}
                        isReplyTo={comment.isReplyTo}
                    />
                ))}
            </div>
        </div>
    )
}