'use client'

import { CommentCard, IComment, ICommentCard } from "@/entities/comments/ui"
import { AddComment, CommentFilter } from "@/features"
import { useEffect, useRef, useState } from "react"
import styles from "./styles.module.scss";
import { getCommentsByVideoHash } from "@/shared/api/comments/getCommentsByVideoHash";
import { CommentSkeleton, VideoThumbnailSkeleton } from "@/shared/ui";
import { IChannel } from "@/entities/channels/modal/types";



export type commentFilter = 'famous' | "new"

export interface IFilter {
    id: string
    value: commentFilter
}

interface IComments {
    initComments: IComment[]
    videoHash: string
    me: IChannel
}

export const Comments: React.FC<IComments> = ({
    initComments,
    videoHash,
    me
}) => {
    const [filter, setFilter] = useState<IFilter>({
        id: '1',
        value: 'famous'
    })
    const [isLoading, setIsLoading] = useState(false)
    const [commentsList, setCommentsList] = useState(initComments)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef<HTMLDivElement | null>(null)
    
    useEffect(() => {
        if (!loadingRef.current) return
        if (observerRef.current) return

        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 1
        }

        const callback = async (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0]
            
            if (entry.isIntersecting && !isLoading) {
                // console.log('ДОСТИГЛИ ДНА, ГРУЗИМ СТРАНИЦУ')
                setIsLoading(true)
                
                try {
                    // setTimeout(async () => {
                        const res = await getCommentsByVideoHash(videoHash, 20, 40)
                        console.log('ПОЛУЧЕНО НОВЫХ КОММЕНТОВ:', res)
                        if (res.total === 0) {
                            observerRef.current?.disconnect()
                            setIsLoading(false)
                            loadingRef.current = null
                            return
                        }
                        setCommentsList((prev: IComment[]) => [...prev, ...res.comments])
                        setIsLoading(false)
                    // }, 3000)
                } catch (error) {
                    console.error('ОШИБКА ЗАГРУЗКИ:', error)
                    setIsLoading(false)
                }
            }
        }

        if(initComments.length > 0) {
            observerRef.current = new IntersectionObserver(callback, options)
            observerRef.current.observe(loadingRef.current)
        }


        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }
        }
    }, [isLoading]) // Добавил зависимости



    return (
        <div className={styles.comments}>
            <div className={styles.comments_header}>
                <h2>{commentsList?.length} комментария</h2>
                <CommentFilter filter={filter} setFilter={setFilter}/>
            </div>
            <AddComment me={me} videoHash={videoHash}/>
            <div className={styles.comments_comments}>
                {commentsList?.map((comment: IComment) => (
                    <CommentCard                         
                        key={comment.id}
                        comment={comment}
                        videoHash={videoHash}
                    />
                ))}
            </div>
            
            {/* ЭТОТ СПАН - ТРИГГЕР ДЛЯ ПОДГРУЗКИ */}
            <div ref={loadingRef} style={{ height: '10px', margin: '20px 0' }} className={styles.comments_comments}>
                {(isLoading && commentsList?.length <= 0) && Array.from({length: 12}, (_, index) => {
                    return <div key={index} className={styles.videoCardWrapper}>
                        <CommentSkeleton />
                    </div>
                })}   
            </div>
        </div>
    )
}