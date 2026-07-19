"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { ThumbnailVideoCard } from "@/entities/thumbnailVideo/ui/videoCard";
import { Svg, Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { getVideos } from "@/shared/api/video/getVideoList";
import { ThumbnailShortVideoCard, VideoTags } from "@/entities";
import { getVideosCount } from "@/shared/utils/getVideosCount";
import { getShortsCount } from "@/shared/utils/getShortsCount";
import { mapVideoList } from "@/entities/thumbnailVideo/modal/mapVideoList";

import styles from "./styles.module.scss";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";

interface ITAG {
  id: string;
  name: string;
}

export const VideoList = ({
  tags,
  initVideos,
  jwt,
}: {
  tags?: ITAG[];
  initVideos: any[];
  jwt: string;
}) => {
  const [activeTag, setActiveTag] = useState<string>(tags?.[0].id || "");
  const device = useDeviceIsMobile();
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchVideoList = async () => {
    const res = await getVideos(jwt, activeTag);
    return res?.videos || []
  }

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
            <div ref={loadingRef} className={styles.videoGrid}>
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
            <div ref={loadingRef} className={styles.videoGrid}>
              нет видео
            </div>
          )}

          {data && data?.length > 0 && !isLoading && (
            <>
              <div className={styles.videoGrid}>
                {data
                  ?.filter((video: IVideo) => !video?.isShort)
                  ?.slice(0, getVideosCount(device))
                  ?.map((video: IVideo, index) => (
                    <div key={index} className={styles.videoCardWrapper}>
                      <ThumbnailVideoCard video={video} />
                    </div>
                  ))}
              </div>

              {data.filter((v) => v.isShort).length > 0 && (
                <div className={styles.shortsTag}>
                  <Svg name="shortsRed" />
                  <Text size={20}>Shorts</Text>
                </div>
              )}

              <div className={styles.videoGridHorts}>
                {data
                  ?.filter((video: IVideo) => video?.isShort)
                  .slice(0, getShortsCount(device))
                  ?.map((video: IVideo, index) => (
                    <div key={index} className={styles.hortsVideoCardWrapper}>
                      <ThumbnailShortVideoCard {...video} />
                    </div>
                  ))}
              </div>

              <div className={styles.videoGrid}>
                {data
                  .filter((video: IVideo) => !video?.isShort)
                  .slice(getVideosCount(device), getVideosCount(device) * 2)
                  .map((video: IVideo, index) => (
                    <div key={index} className={styles.videoCardWrapper}>
                      <ThumbnailVideoCard video={video} />
                    </div>
                  ))}
              </div>

              {data.filter((v) => v.isShort).length > 0 && (
                <div className={styles.shortsTag}>
                  <Svg name="shortsRed" />
                  <Text size={20}>Shorts</Text>
                </div>
              )}

              <div className={styles.videoGridHorts}>
                {data
                  .filter((video: IVideo) => video?.isShort)
                  .slice(getShortsCount(device), getShortsCount(device) * 2)
                  .map((video: IVideo, index) => (
                    <div key={index} className={styles.hortsVideoCardWrapper}>
                      <ThumbnailShortVideoCard {...video} />
                    </div>
                  ))}
              </div>

              <div className={styles.videoGrid}>
                {data
                  .filter((video: IVideo) => !video?.isShort)
                  .slice(getVideosCount(device) * 2)
                  .map((video: IVideo, index) => (
                    <div key={index} className={styles.videoCardWrapper}>
                      <ThumbnailVideoCard video={video} />
                    </div>
                  ))}
              </div>

              {/* ЭТОТ СПАН - ТРИГГЕР ДЛЯ ПОДГРУЗКИ */}
              <div
                ref={loadingRef}
                style={{ height: "100px", margin: "20px" }}
                className={styles.videoGrid}
              >
                loadingRef
                {(isLoading || data?.length <= 0) &&
                  Array.from({ length: 12 }, (_, index) => {
                    return (
                      <div key={index} className={styles.videoCardWrapper}>
                        <VideoThumbnailSkeleton />
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
