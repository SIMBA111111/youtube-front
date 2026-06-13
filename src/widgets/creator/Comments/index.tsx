'use client'

import { FC, useEffect, useState } from "react";
import { getCommentsByVideoHash } from "@/shared/api/comments/getCommentsByVideoHash";
import { CreatorCommentCard, ICreatorComment } from "@/entities/comments/ui/CreatorComments";
import styles from "./styles.module.scss";


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

    const fetchData = async () => {
        const res = await getCommentsByVideoHash(videoHash, pagination.offset, pagination.limit, '', me.Id, '')
        console.log('res = ', res);
        setComments(res.comments)
    }

    useEffect(() => {
        fetchData()
    }, [pagination])
    
    return (
        <div className={styles.container}>
            {comments.map((comment: ICreatorComment) => 
                <div className={styles.comment} key={comment.id}>
                    <CreatorCommentCard comment={comment} videoId={videoId} me={me} refreshData={fetchData}/>
                </div>
            )}
        </div>
    )
}