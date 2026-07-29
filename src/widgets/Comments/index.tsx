"use client";

import { CommentCard, IComment } from "@/entities/comments/ui/VideoComment";
import { AddComment, CommentFilter } from "@/features";
import { useEffect, useRef, useState } from "react";
import { getCommentsByVideoHash } from "@/shared/api/comments/getCommentsByVideoHash";
import { IChannel } from "@/entities/channels/modal/types";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import styles from "./styles.module.scss";


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
  me: IChannel;
  commentCount: number
}

const PAGINATION_STEP = 20

export const Comments: React.FC<IComments> = ({ videoId, me, commentCount }) => {
  const [filter, setFilter] = useState<IFilter>({
    id: "1",
    value: "famous",
  });
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchCommentsList = async ({ 
    offset, 
    limit, 
  }: IPagination) => {
    const res = await getCommentsByVideoHash(
        videoId,
        offset,
        limit,
        filter.value,
        me.id
    );
    return res?.comments || [];
  };

  const { 
    data,
    isLoading,
    hasMore,
    refreshData
  } = useInfinityScroll<IComment, IFilter>({
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
        <h2>{commentCount} комментария</h2>
        <CommentFilter filter={filter} setFilter={setFilter}/>
      </div>
      <AddComment
        me={me}
        videoId={videoId}
        handleRefreshCommentsList={refreshData}
      />
      <div className={styles.comments_comments}>
        {data?.map((comment: IComment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            videoId={videoId}
            me={me}
            refreshCommentsList={refreshData}
          />
        ))}
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
