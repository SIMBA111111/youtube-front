"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { Svg, Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { ThumbnailShortVideoCard, VideoTags } from "@/entities";
import { getVideosCount } from "@/shared/utils/getVideosCount";
import { getShortsCount } from "@/shared/utils/getShortsCount";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";

import { VideoGrid } from "./videoGrid";
import { ShortTag } from "./shortsTag";
import styles from "./styles.module.scss";

interface ITAG {
  id: string;
  name: string;
}

export type deviceType = 'isMobile' | 'isTablet' | 'isDesktop'

export const VideoList = ({
  tags,
  jwt,
}: {
  tags?: ITAG[];
  jwt: string;
}) => {
  const [activeTag, setActiveTag] = useState<string>(tags?.[0].id || "");
  const device = useDeviceIsMobile();
  const loadingRef = useRef<HTMLDivElement | null>(null);

  // ✅ Используем useCallback для мемоизации
  const fetchVideoList = useCallback(async ({offset, limit, filter}: {offset: number, limit: number, filter?: string}) => {
    const res = await getVideos(jwt, filter || activeTag, null, offset, limit);
    return res?.videos || []
  }, [jwt, activeTag]);

  const {
    data,
    hasMore,
    isLoading,
    refreshData
  } = useInfinityScroll<IVideo, string>({
    paginationStep: 5,
    filter: activeTag,
    fetchData: fetchVideoList,
    triggerRef: loadingRef
  })

  const handleActiveTag = (tagId: string) => {
    setActiveTag(tagId);
  };

  const longsCount = useMemo(() => getVideosCount(device), [device])
  const shortsCount = useMemo(() => getShortsCount(device), [device])
  
  const { shorts, longs } = data.reduce<{ shorts: IVideo[]; longs: IVideo[] }>(
    (acc, video: IVideo) => {
      if (video.isShort) {
        acc.shorts.push(video);
      } else {
        acc.longs.push(video);
      }
      return acc;
    },
    { shorts: [], longs: [] }
  );

  const firstLongSection = longs.slice(0, longsCount)
  const secondLongSection = longs.slice(longsCount, longsCount * 2)
  const restLongSection = longs.slice(longsCount * 2)

  const firstShortsSection = shorts.slice(0, shortsCount)
  const secondShortsSection = shorts.slice(shortsCount, shortsCount * 2)

  console.log('ререндер');

  return (
    <div className={styles.container} id="videoListContainer">
        {tags && tags.length > 0 && (
          <div className={styles.tagList}>
            {tags.map((tag: ITAG, index) => {
              return (
                <VideoTags
                  key={index}
                  id={tag.id}
                  name={tag.name}
                  activeTag={activeTag}
                  setActiveTag={handleActiveTag}
                />
              );
            })}
          </div>
        )}

        <div className={styles.videosContainer}>
          <div className={styles.content}>
            {data && data?.length <= 0 && isLoading && (
              <div className={styles.videoGrid}>
                {(isLoading || data?.length <= 0) &&
                  Array.from({ length: 12 }, (_, index) => {
                    return (
                      <div key={index} className={styles.videoCardWrapper}>
                        <VideoThumbnailSkeleton />
                      </div>
                    );
                  })}
              </div>
            )}

            {data && data?.length <= 0 && !isLoading && (
              <div className={styles.videoGrid}>
                нет видео
              </div>
            )}

            {data && data?.length > 0 && !isLoading && (
              <>
                <VideoGrid videos={firstLongSection} />

                {firstShortsSection.length > 0 && (
                  <ShortTag />
                )}

                <VideoGrid videos={firstShortsSection} isShort/>

                <VideoGrid videos={secondLongSection} />

                {secondShortsSection.length > 0 && (
                  <ShortTag />
                )}

                <VideoGrid videos={secondShortsSection} isShort/>

                <VideoGrid videos={restLongSection} />
              </>
            )}

            {/* ЭТОТ СПАН - ТРИГГЕР ДЛЯ ПОДГРУЗКИ */}
            <div
              ref={loadingRef}
              style={{ height: "100px", margin: "20px" }}
              className={styles.videoGrid}
            >
              {(isLoading || data?.length <= 0) &&
                Array.from({ length: 12 }, (_, index) => {
                  return (
                    <div key={index} className={styles.videoCardWrapper}>
                      <VideoThumbnailSkeleton />
                    </div>
                  );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
