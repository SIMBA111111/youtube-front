import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { Svg, Text } from "@/shared/ui";
import { formatDate } from "@/shared/utils/formatDate";
import { formatViews } from "@/shared/utils/formatViews";
import { FiltersEnum } from "@/features/ChannelVideoList/ui";
import { getVideoAccess } from "@/shared/utils/getVideoAccess";
import { EmptyTable } from "./emptyTable";
import { ActionsPanel } from "./actionsPanel";
import styles from "./styles.module.scss";


interface IVideosTable {
  videos?: IVideoFullInfo[];
  filter: keyof typeof FiltersEnum
  handleFilter: () => void
  channelId: string
}

export const VideosTable: FC<IVideosTable> = ({ 
  videos = [],
  filter,
  handleFilter,
  channelId
}) => {

  const getLikePercentage = (likes: number, dislikes: number) => {
    const total = likes + dislikes;
    if (total === 0) return 0;
    return Math.round((likes / total) * 100);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Видео</th>
            <th>Доступ</th>
            <th className={styles.tableDateFilter} onClick={() => handleFilter()}>
              <Text weight={600}>Дата</Text>
              {filter === FiltersEnum.OLD && <Svg size="small" name="arrowDown"/>}
              {filter === FiltersEnum.NEWS && <Svg name="arrowUp"/>}
            </th>
            <th>Просмотры</th>
            <th>Комментарии</th>
            <th>Лайки</th>
            <th>% "Нравится"</th>
          </tr>
        </thead>
        <tbody>
          {videos.length === 0 ? (
              <td colSpan={6} className={styles.emptyState}>
                <EmptyTable />
              </td>
          ) : (
            videos.map((video) => (
              <tr key={video.video.id}>
                <td className={styles.videoCell}>
                  <div className={styles.videoInfo}>
                    <img 
                      src={video.video.thumbnailUrl} 
                      alt={video.video.name}
                      className={styles.thumbnail}
                    />
                    <div className={styles.descr}>
                      <span className={styles.videoTitle}>{video.video.name}</span>
                      <ActionsPanel
                        video={video}
                        channelId={channelId}
                      />
                    </div>
                    
                  </div>
                </td>
                <td className={styles.dateCell}>{getVideoAccess(video.video.videoAccess)}</td>
                <td className={styles.dateCell}>{formatDate(video.video.datePublication || '')}</td>
                <td className={styles.numberCell}>{formatViews(video.video.viewersCount)}</td>
                <td className={styles.numberCell}>{video.video.commentsCount}</td>
                <td className={styles.numberCell}>{video.video.likesCount}</td>
                <td className={styles.likeCell}>
                  <div className={styles.likeBar}>
                    <div 
                      className={styles.likeBarFill}
                      style={{ width: `${getLikePercentage(video.video.likesCount, video.video.dislikesCount)}%` }}
                    />
                  </div>
                  <span className={styles.likePercentage}>
                    {getLikePercentage(video.video.likesCount, video.video.dislikesCount)}%
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