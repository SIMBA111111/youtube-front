"use client";

import { useEffect, useRef } from "react";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";
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

    return res?.videos || []
  }

  const { 
    data,
    isLoading,
    hasMore,
  } = useInfinityScroll<IVideo, any>({
    paginationStep: 20,
    filter: '',
    fetchData: fetchRecommendedVideoList,
    triggerRef: loadingRef
  })

  return (
    <div className={styles.container}>
      {data
        .filter((video: IVideo) => !video.isShort)
        .map((video: IVideo, index) => {
          return (
            <div key={index} className={styles.videoCardWrapper}>
              <ThumbnailVideoCard key={video.id} video={video} isRow />
            </div>
          );
        })}
      {<div ref={loadingRef} style={{ height: "50px", margin: "20px" }}>
        {isLoading && (
          <div className={styles.recommendedVideoLoader}>
            <Spinner />
          </div>
        )}
      </div>}
    </div>
  );
};
