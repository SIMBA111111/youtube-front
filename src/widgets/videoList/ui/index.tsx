"use client";

import { useState, useEffect, useRef, useCallback, useMemo, FC } from "react";

import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { VideoThumbnailSkeleton } from "@/shared/ui";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { VideoTags } from "@/entities";
import { getVideosCount } from "@/shared/utils/getVideosCount";
import { getShortsCount } from "@/shared/utils/getShortsCount";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { InfinityScrollLoader } from "@/shared/ui/InfinityScrollLoader";
import { ITagEntity } from "@/entities/videoTags/model";

import { VideoGrid } from "./videoGrid";
import { ShortTag } from "./shortsTag";
import styles from "./styles.module.scss";


export type deviceType = 'isMobile' | 'isTablet' | 'isDesktop'

interface IVideoList {
  tags: ITagEntity[];
  jwt: string;
}

export const VideoList: FC<IVideoList> = ({tags, jwt,}) => {
  const [activeTag, setActiveTag] = useState<string>(tags?.[0].name || "asd");
  const device = useDeviceIsMobile();
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchVideoList = useCallback(async ({offset, limit}: {offset: number, limit: number}) => {
    const res = await getVideos(jwt, activeTag, null, offset, limit);
    if(res.success)
      return res.data

    return []
  }, [jwt, activeTag]);

  const {
    data,
    hasMore,
    isLoading,
    refreshData
  } = useInfinityScroll<IVideoFullInfo, string>({
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
  
  const { shorts, longs } = data.reduce<{ shorts: IVideoFullInfo[]; longs: IVideoFullInfo[] }>(
    (acc, video: IVideoFullInfo) => {
      if (video.video.isShort) {
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

  console.log('data: ', data);
  console.log('firstLongSection: ', firstLongSection);
  console.log('firstShortsSection: ', firstShortsSection);

  return (
    <div className={styles.container} id="videoListContainer">
        {tags && tags.length > 0 && (
          <div className={styles.tagList}>
            {tags.map((tag: ITagEntity, index) => {
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
