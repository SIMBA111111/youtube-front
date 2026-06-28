"use client";

import { CommentCard, IComment, ICommentCard } from "@/entities/comments/ui/VideoComment";
import { AddComment, CommentFilter } from "@/features";
import { useEffect, useRef, useState } from "react";
import { getCommentsByVideoHash } from "@/shared/api/comments/getCommentsByVideoHash";
import { CommentSkeleton, VideoThumbnailSkeleton } from "@/shared/ui";
import { IChannel } from "@/entities/channels/modal/types";
import styles from "./styles.module.scss";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";


export type commentFilter = "famous" | "new";

export interface IFilter {
  id: string;
  value: commentFilter;
}

interface IComments {
  videoId: string;
  me: IChannel;
  commentCount: number
}

const options = {
  root: null,
  rootMargin: "100px",
  threshold: 0.1, // Лучше 0.1 чем 1.0, чтобы срабатывало чуть раньше
};

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
  }: {
    offset: number;
    limit: number;
  }) => {
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

  return (
    <div className={styles.comments}>
      <div className={styles.comments_header}>
        <h2>{commentCount} комментария</h2>
        <CommentFilter filter={filter} setFilter={setFilter} />
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
      <div ref={loadingRef} style={{ height: "50px", margin: "20px 0" }}>
        loadingRef
        {isLoading &&
          Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={styles.videoCardWrapper}>
              <CommentSkeleton />
            </div>
          ))}
      </div>

      {!hasMore && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Больше нет комментариев
        </div>
      )}
    </div>
  );
};
