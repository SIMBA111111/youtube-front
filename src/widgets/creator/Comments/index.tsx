'use client'

import { FC, useEffect, useState } from "react";
import { getCommentsByVideoHash } from "@/shared/api/comments/getCommentsByVideoHash";
import styles from "./styles.module.scss";
import { CreatorCommentCard, ICreatorComment } from "@/entities/comments/ui/CreatorComments";


interface IComments {
    videoId: string
    videoHash: string
    me: any
}

interface IPagination {
    offset: number
    limit: number
    pageSize: number
    pageNumber: number
}

export const Comments: FC<IComments> = ({
    videoId,
    videoHash,
    me
}) => {
    const [pagination, setPagination] = useState<IPagination>({
        offset: 0,
        limit: 20,
        pageSize: 20,
        pageNumber: 0
    })
    const [comments, setComments] = useState<ICreatorComment[]>([])

    useEffect(() => {
        (async() => {
            const res = await getCommentsByVideoHash(videoHash, pagination.offset, pagination.limit, '', me.Id, '')
            console.log('res = ', res);
            setComments(res.comments)
        })()
    }, [])
    
    return (
        <div className={styles.container}>
            {comments.map((comment: ICreatorComment) => 
                <CreatorCommentCard comment={comment} videoId={videoId} me={me} />
            )}
        </div>
    )
}