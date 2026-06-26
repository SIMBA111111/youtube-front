"use client";

import { CommentCard, IComment, ICommentCard } from "@/entities/comments/ui/VideoComment";
import { AddComment, CommentFilter } from "@/features";
import { useEffect, useRef, useState } from "react";
import { getCommentsByVideoHash } from "@/shared/api/comments/getCommentsByVideoHash";
import { CommentSkeleton, VideoThumbnailSkeleton } from "@/shared/ui";
import { IChannel } from "@/entities/channels/modal/types";
import styles from "./styles.module.scss";


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
  const [isLoading, setIsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState<IComment[]>([]);
  const [hasMore, setHasMore] = useState(true); // Добавьте этот флаг
  const [pagination, setPagination] = useState({ offset: 0, limit: PAGINATION_STEP });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  const fetchCommentsList = async (videoId: string, offset: number, limit: number, _filter: IFilter, userId: string) => {
    if(isFetchingRef.current) return []
    isFetchingRef.current = true

    try {
      const res = await getCommentsByVideoHash(
        videoId,
        offset,
        limit,
        _filter.value,
        userId
      )

      if (res?.comments && res.comments.length > 0) {
        setCommentsList((prev: IComment[]) => [...prev, ...res.comments])
      }
  
      isFetchingRef.current = false
      return res.comments
    } catch (error) {

      isFetchingRef.current = false
      console.error("ОШИБКА ЗАГРУЗКИ:", error)
      return false
    }
  }

  const handleRefreshCommentsList = async () => {
    setHasMore(true);
    setIsLoading(true)
    fetchCommentsList(videoId, 0, pagination.limit, filter, me.id)
    setIsLoading(false)
  };

  const callback = async (entries: IntersectionObserverEntry[]) => {
    console.log('callback');
    console.log('isLoading: ', isLoading);
    
    const entry = entries[0];

    if (entry.isIntersecting && !isLoading && hasMore) {
      // Добавьте hasMore
      setIsLoading(true);

      console.log('pagination = ', pagination);

      try {
        const resComments = await fetchCommentsList(
          videoId,
          pagination.offset,
          pagination.limit,
          filter,
          me.id
        )

        if (!resComments || resComments.length === 0 || resComments.length < PAGINATION_STEP) {
          setHasMore(false); // Больше нет данных
          setIsLoading(false);

          if(observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
          }
          return;
        }

        setPagination((prev) => ({
          offset: prev.offset + PAGINATION_STEP,
          limit: prev.limit + PAGINATION_STEP,
        }));

        setIsLoading(false);

      } catch (error) {
        console.error("ОШИБКА ЗАГРУЗКИ:", error);
        setIsLoading(false);
      }
    }
  };

  // Сброс состояния при смене фильтра
  // useEffect(() => {
  //   setCommentsList([]);
  //   setPagination({ offset: 0, limit: PAGINATION_STEP });
  //   fetchCommentsList(videoId, 0, PAGINATION_STEP, filter, me.id)
  //   setHasMore(true);

  //   // Отключаем старый observer
  //   if (observerRef.current) {
  //     observerRef.current.disconnect();
  //     observerRef.current = null;
  //   }
  // }, [filter.value]);

  // Настройка IntersectionObserver
  useEffect(() => {
    if (!loadingRef.current || !hasMore) return;

    observerRef.current = new IntersectionObserver(callback, options);
    observerRef.current.observe(loadingRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [hasMore, filter.value, pagination]); // Добавьте зависимости

  // console.log('commentsList = ', commentsList);

  return (
    <div className={styles.comments}>
      <div className={styles.comments_header}>
        <h2>{commentCount} комментария</h2>
        <CommentFilter filter={filter} setFilter={setFilter} />
      </div>
      <AddComment
        me={me}
        videoId={videoId}
        handleRefreshCommentsList={handleRefreshCommentsList}
      />
      <div className={styles.comments_comments}>
        {commentsList?.map((comment: IComment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            videoId={videoId}
            me={me}
            refreshCommentsList={handleRefreshCommentsList}
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

      {!hasMore && commentsList.length > 0 && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Больше нет комментариев
        </div>
      )}
    </div>
  );
};
