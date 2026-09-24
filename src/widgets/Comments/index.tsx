"use client";

import { CommentCard } from "@/entities/comments/ui/VideoComment";
import { AddComment, CommentFilter } from "@/features";
import { useEffect, useRef, useState } from "react";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { getWordForm } from "@/shared/utils/getWordFrom";
import { IChannelData } from "@/shared/utils/getChannelData";
import { getCommentsByVideoId, IMapCommentStatistic } from "@/shared/api/comments/getCommentsByVideoId";
import styles from "./styles.module.scss";
import { ICommentFullInfo } from "@/entities/comments/model/types";


export type commentFilter = "famous" | "new";

export interface IFilter {
  id: string;
  value: commentFilter;
}

export interface IPagination {
  offset: number;
  limit: number;
}

interface IComments {
  videoId: string;
  me: IChannelData | null;
  commentCount: number
}

interface IResponse {
  comments: ICommentFullInfo
  commentsCount: number
}

const PAGINATION_STEP = 20

export const Comments: React.FC<IComments> = ({ videoId, me, commentCount }) => {
  const [filter, setFilter] = useState<IFilter>({
    id: "1",
    value: "famous",
  });
  const [commentStatistic, setCommentStatistic] = useState<IMapCommentStatistic | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchCommentsList = async ({ 
    offset, 
    limit, 
  }: IPagination) => {
    const res = await getCommentsByVideoId(
        videoId,
        offset,
        limit,
        filter.value,
        me?.id || ''
    );

    console.log(res);
    

    if (typeof res !== 'string' && res && res.data) {
      setCommentStatistic(res.data.commentsStatistic)
      return res.data.comments || [];
    }
    return []
  };

  const { 
    data,
    isLoading,
    hasMore,
    refreshData
  } = useInfinityScroll<ICommentFullInfo, IFilter>({
    paginationStep: 10,
    filter: filter,
    fetchData: fetchCommentsList,
    triggerRef: loadingRef
  })

  useEffect(() => {
    refreshData();
  }, [filter.id, filter.value]);

  

  return (
    <div className={styles.comments}>
      <div className={styles.comments_header}>
        <h2>{commentCount} {getWordForm('комментарий', commentCount)} </h2>
        <CommentFilter filter={filter} setFilter={setFilter}/>
      </div>
      <AddComment
        me={me}
        videoId={videoId}
        handleRefreshCommentsList={refreshData}
      />
      <div className={styles.comments_comments}>
        {data.map((comment: ICommentFullInfo) => {
          console.log('commentStatistic && commentStatistic[comment.id]: ', commentStatistic && commentStatistic[comment.id]);
        
          return <CommentCard
            key={comment.id}
            comment={comment}
            commentStatistic={commentStatistic && commentStatistic[comment.id]}
            videoId={videoId}
            me={me}
            refreshCommentsList={refreshData}
          />
        })}
      </div>

      {/* ТРИГГЕР ДЛЯ ПОДГРУЗКИ */}
      <div ref={loadingRef} style={{ height: "0px", margin: "20px 0" }}/>

      {!hasMore && (
        <div style={{ textAlign: "center", paddingBottom: "20px" }}>
          Больше нет комментариев
        </div>
      )}
    </div>
  );
};
