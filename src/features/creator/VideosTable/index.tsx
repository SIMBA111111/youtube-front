import { FC } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { Svg, Text } from "@/shared/ui";
import { formatDate } from "@/shared/utils/formatDate";
import { formatViews } from "@/shared/utils/formatViews";
import { FiltersEnum } from "@/features/ChannelVideoList/ui";
import styles from "./styles.module.scss";
import { EmptyTable } from "./emptyTable";


interface IVideosTable {
  videos?: IVideo[];
  filter: keyof typeof FiltersEnum
  handleFilter: () => void
}

export const VideosTable: FC<IVideosTable> = ({ 
  videos = [],
  filter,
  handleFilter
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
            <th className={styles.tableDateFilter} onClick={() => handleFilter()}>
              <Text weight={600}>Дата</Text>
              {filter === FiltersEnum.NEWS && <Svg size="small" name="arrowDown"/>}
              {filter === FiltersEnum.OLD && <Svg name="arrowUp"/>}
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
              <tr key={video.id}>
                <td className={styles.videoCell}>
                  <div className={styles.videoInfo}>
                    <img 
                      src={video.previewUrl} 
                      alt={video.name}
                      className={styles.thumbnail}
                    />
                    <div className={styles.descr}>
                      <span className={styles.videoTitle}>{video.name}</span>
                      <div className={styles.videoActions}>
                        <div className={styles.videoAction}>
                          <Svg name="pancel"/>
                          <div className={styles.notificationTooltip}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Редактировать</Text>
                          </div>
                        </div>
                        <div className={styles.videoAction}>
                          <Svg name="analytics"/>
                          <div className={styles.notificationTooltip}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Аналитика</Text>
                          </div></div>
                        <div className={styles.videoAction}>
                          <Svg name="comments"/>
                          <div className={styles.notificationTooltip}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Комментарии</Text>
                          </div>
                        </div>
                        <div className={styles.videoAction}>
                          <Svg name="doublePlayer"/>
                          <div className={styles.notificationTooltip}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Видео</Text>
                          </div>
                        </div>
                        <div className={styles.videoAction}>
                          <Svg name="verticalEllipsis"/>
                          <div className={styles.notificationTooltip}>
                              <Text size={14} color='var(--whiteText)' weight={300}>Действия</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
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