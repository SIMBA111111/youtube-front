'use client'

import { FC, useEffect, useState } from "react";
import { CreatorCommentCard, ICreatorComment } from "@/entities/comments/ui/CreatorComments";
import { getCommentsByVideoId } from "@/shared/api/comments/getCommentsByVideoId";
import styles from "./styles.module.scss";

interface IComments {
    videoId: string
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
        const res = await getCommentsByVideoId(videoId, pagination.offset, pagination.limit, '', me.Id, '')
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