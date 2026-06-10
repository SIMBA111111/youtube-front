import { FC, useState } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { Svg, Text } from "@/shared/ui";
import { formatDate } from "@/shared/utils/formatDate";
import { formatViews } from "@/shared/utils/formatViews";
import { FiltersEnum } from "@/features/ChannelVideoList/ui";
import { EmptyTable } from "./emptyTable";
import { getVideoAccess } from "@/shared/utils/getVideoAccess";
import { PopoverAction } from "../popoverAction";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";


interface IVideosTable {
  videos?: IVideo[];
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
  const [isOpenedActionPopover, setIsOpenedActionPopover] = useState<boolean>(false)
  const router = useRouter()

  const getLikePercentage = (likes: number, dislikes: number) => {
    const total = likes + dislikes;
    if (total === 0) return 0;
    return Math.round((likes / total) * 100);
  };

  const handleOpenVideoInNewTab = (videoId: string) => {
    window.open(process.env.NEXT_PUBLIC_FRONTEND_URL + '/watch?v=' + videoId, '_blank');
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Видео</th>
            <th>Доступ</th>
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
                          <div className={styles.notificationTooltip} onClick={() => router.push(`/video/${video.id}/edit`)}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Редактировать</Text>
                          </div>
                        </div>
                        <div className={styles.videoAction} onClick={() => router.push(`/video/${video.id}/analytics`)}>
                          <Svg name="analytics"/>
                          <div className={styles.notificationTooltip}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Аналитика</Text>
                          </div></div>
                        <div className={styles.videoAction} onClick={() => router.push(`/video/${video.id}/${video.videoHash}/comments`)}>
                          <Svg name="comments"/>
                          <div className={styles.notificationTooltip}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Комментарии</Text>
                          </div>
                        </div>
                        <div className={styles.videoAction} onClick={() => handleOpenVideoInNewTab(video.id)}>
                          <Svg name="doublePlayer"/>
                          <div className={styles.notificationTooltip}>
                            <Text size={14} color='var(--whiteText)' weight={300}>Видео</Text>
                          </div>
                        </div>
                        <div className={styles.videoAction} onClick={() => setIsOpenedActionPopover(prev => !prev)}>
                          <Svg name="verticalEllipsis"/>
                          <div className={styles.notificationTooltip}>
                              <Text size={14} color='var(--whiteText)' weight={300}>Действия</Text>
                          </div>
                          <PopoverAction 
                            isOpen={isOpenedActionPopover} 
                            onClose={() => setIsOpenedActionPopover(false)} 
                            videoHash={video.videoHash} 
                            videoId={video.id} 
                            videoMp4Url={video.videoMp4Url}
                            channelId={channelId}
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </td>
                <td className={styles.dateCell}>{getVideoAccess(video.videoAccess)}</td>
                <td className={styles.dateCell}>{formatDate(video.datePublication || '')}</td>
                <td className={styles.numberCell}>{formatViews(video.viewersCount)}</td>
                <td className={styles.numberCell}>{video.commentsCount}</td>
                <td className={styles.numberCell}>{video.likeCount}</td>
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