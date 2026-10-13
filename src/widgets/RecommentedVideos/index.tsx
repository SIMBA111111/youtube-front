"use client";

import { useEffect, useRef } from "react";
import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Spinner, Svg } from "@/shared/ui";
import { getRecommentedVideos } from "@/shared/api/video/getRecommentedVideos";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import styles from "./styles.module.scss";

interface IRecommentedVideos {
  videoId: string;
  myChannelId?: string;
}

interface IFetchRecommendedVideoList {
  offset: number,
  limit: number
  filter?: any
}

export const RecommentedVideos: React.FC<IRecommentedVideos> = ({
  videoId,
  myChannelId,
}) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const fetchRecommendedVideoList = async ({
    offset,
    limit,
  }: IFetchRecommendedVideoList) => {
    const res = await getRecommentedVideos(
      videoId,
      offset,
      limit,
      myChannelId
    );

    if (!res.data || res.error || !res.success) {
      return []
    }

    return res.data
  }

  const { 
    data,
    isLoading,
    hasMore,
    refreshData
  } = useInfinityScroll<IVideoFullInfo, any>({
    paginationStep: 10,
    filter: '',
    fetchData: fetchRecommendedVideoList,
    triggerRef: loadingRef
  })

  return (
    <div className={styles.container}>
      {data
        .filter((video: IVideoFullInfo) => !video.video.isShort)
        .map((video: IVideoFullInfo, index) => {
          return (
            <div key={index} className={styles.videoCardWrapper}>
              <ThumbnailVideoCard key={video.video.id} video={video} isRow />
            </div>
          );
        })}
      <div ref={loadingRef} style={{ height: "10px", margin: "10px" }}>
        {isLoading && (
          <div className={styles.recommendedVideoLoader}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
