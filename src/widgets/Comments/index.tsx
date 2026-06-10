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
  videoHash: string;
  videoId: string;
  me: IChannel;
}

const options = {
  root: null,
  rootMargin: "100px",
  threshold: 0.1, // Лучше 0.1 чем 1.0, чтобы срабатывало чуть раньше
};

export const Comments: React.FC<IComments> = ({ videoHash, videoId, me }) => {
  const [filter, setFilter] = useState<IFilter>({
    id: "1",
    value: "famous",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [commentsList, setCommentsList] = useState<IComment[]>([]);
  const [hasMore, setHasMore] = useState(true); // Добавьте этот флаг
  const [pagination, setPagination] = useState({ offset: 0, limit: 20 });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const handleRefreshCommentsList = async () => {
    setHasMore(true);
    setIsLoading(true);

    try {
      const res = await getCommentsByVideoHash(
        videoHash,
        0,
        20,
        filter.value,
        me.id
      );
      setCommentsList(res.comments);
      setIsLoading(false);
    } catch (error) {
      console.error("ОШИБКА ЗАГРУЗКИ:", error);
      setIsLoading(false);
    }
  };

  const callback = async (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (entry.isIntersecting && !isLoading && hasMore) {
      // Добавьте hasMore
      setIsLoading(true);

      try {
        const res = await getCommentsByVideoHash(
          videoHash,
          pagination.offset,
          pagination.limit,
          filter.value,
          me.id
        );

        if (!res.comments || res.comments.length === 0) {
          setHasMore(false); // Больше нет данных
          setIsLoading(false);
          observerRef.current.disconnect();
          observerRef.current = null;
          return;
        }

        setCommentsList((prev: IComment[]) => [...prev, ...res.comments]);
        setPagination((prev) => ({
          offset: prev.offset + 20,
          limit: prev.limit + 20,
        }));
        setIsLoading(false);

        if (res.comments.length < 20) {
          setHasMore(false); // Больше нет данных
          setIsLoading(false);
          observerRef.current.disconnect();
          observerRef.current = null;
          return;
        }
      } catch (error) {
        console.error("ОШИБКА ЗАГРУЗКИ:", error);
        setIsLoading(false);
      }
    }
  };

  // Сброс состояния при смене фильтра
  useEffect(() => {
    setCommentsList([]);
    setPagination({ offset: 0, limit: 20 });
    setHasMore(true); // Сбросить флаг
    setIsLoading(false);

    // Отключаем старый observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, [filter.value]);

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
  }, [hasMore, filter.value]); // Добавьте зависимости

  return (
    <div className={styles.comments}>
      <div className={styles.comments_header}>
        <h2>{commentsList?.length} комментария</h2>
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
            videoHash={videoHash}
            me={me}
          />
        ))}
      </div>

      {/* ТРИГГЕР ДЛЯ ПОДГРУЗКИ */}
      <div ref={loadingRef} style={{ height: "10px", margin: "20px 0" }}>
        {isLoading &&
          Array.from({ length: 3 }, (_, index) => (
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
