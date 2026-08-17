"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { Spinner, Svg, Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { ThumbnailShortVideoCard, VideoTags } from "@/entities";
import { getVideosCount } from "@/shared/utils/getVideosCount";
import { getShortsCount } from "@/shared/utils/getShortsCount";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { InfinityScrollLoader } from "@/shared/ui/InfinityScrollLoader";

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
  const [activeTag, setActiveTag] = useState<string>(tags?.[0].name || "");
  const device = useDeviceIsMobile();
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchVideoList = useCallback(async ({offset, limit}: {offset: number, limit: number}) => {
    const res = await getVideos(jwt, activeTag, null, offset, limit);
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

  useEffect(() => {
    refreshData();
  }, [activeTag]);

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

  console.log(data);
  

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
            <div className={styles.videoGrid}>
              {(!data || data?.length <= 0) && isLoading && (
                Array.from({ length: 12 }, (_, index) => {
                  return (
                    <div key={index} className={styles.videoCardWrapper}>
                      <VideoThumbnailSkeleton />
                    </div>
                  );
                })
              )}
            </div>

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

            <div
                ref={loadingRef}
                style={{ height: "10px", margin: "10px" }}
            >
                <InfinityScrollLoader isLoading={isLoading} />
            </div>
        </div>
      </div>
    </div>
  );
};
