'use client'

import { FC, useEffect, useState } from "react";
import { CreatorCommentCard, ICreatorComment } from "@/entities/comments/ui/CreatorComments";
import { getCommentsByVideoId, IGetCommentsByVideoId } from "@/shared/api/comments/getCommentsByVideoId";
import styles from "./styles.module.scss";
import { ICommentFullInfo } from "@/entities/comments/model/types";
import { IChannelData } from "@/shared/utils/getChannelData";

interface IComments {
    videoId: string
    me: IChannelData
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
    const [comments, setComments] = useState<IGetCommentsByVideoId>()

    const fetchData = async () => {
        const res = await getCommentsByVideoId(videoId, pagination.offset, pagination.limit, "new", me.id, '')
        
        if (res?.error || !res?.data || !res.success) {
            return []
        }
        
        setComments(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [pagination])
    
    if (!comments?.comments) {
        return (
            <div>
                Нет комментариев
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {comments.comments.map((comment: ICommentFullInfo) => 
                <div className={styles.comment} key={comment.id}>
                    <CreatorCommentCard comment={comment} commentStatistic={comments.commentsStatistic?.[comment.id] ?? null} videoId={videoId} me={me} refreshData={fetchData}/>
                </div>
            )}
        </div>
    )
}