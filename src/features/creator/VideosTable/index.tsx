import { FC } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import styles from "./styles.module.scss";
import { Svg } from "@/shared/ui";

interface IVideosTable {
  videos?: IVideo[];
}

export const VideosTable: FC<IVideosTable> = ({ 
  videos = [] 
}) => {
  const getLikePercentage = (likes: number, dislikes: number) => {
    const total = likes + dislikes;
    if (total === 0) return 0;
    return Math.round((likes / total) * 100);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Видео</th>
            <th>Дата</th>
            <th>Просмотры</th>
            <th>Комментарии</th>
            <th>Лайки</th>
            <th>% "Нравится"</th>
          </tr>
        </thead>
        <tbody>
          {videos.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyState}>
                Нет видео для отображения
              </td>
            </tr>
          ) : (
            videos.map((video) => (
              <tr key={video.id}>
                <td className={styles.videoCell}>
                  <div className={styles.videoInfo}>
                    <img 
                      src={video.previewUrl} 
                      alt={video.name}
                      className={styles.thumbnail}
                    />
                    <span className={styles.videoTitle}>{video.name}</span>
                  </div>
                  <Svg name="pancel"/>
                  <Svg name="analytics"/>
                  <Svg name="comments"/>
                  <Svg name="doublePlayer"/>
                  <Svg name="verticalEllipsis"/>
                </td>
                <td className={styles.dateCell}>{formatDate(video.datePublication || '')}</td>
                <td className={styles.numberCell}>{formatViews(video.viewersCount)}</td>
                {/* <td className={styles.numberCell}>{video.commentsCount.toLocaleString()}</td> */}
                <td className={styles.numberCell}>10</td>
                <td className={styles.numberCell}>{video.likeCount.toLocaleString()}</td>
                <td className={styles.likeCell}>
                  <div className={styles.likeBar}>
                    <div 
                      className={styles.likeBarFill}
                      style={{ width: `${getLikePercentage(video.likeCount, video.dislikeCount)}%` }}
                    />
                  </div>
                  <span className={styles.likePercentage}>
                    {getLikePercentage(video.likeCount, video.dislikeCount)}%
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};