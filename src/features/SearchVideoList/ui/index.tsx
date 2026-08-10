'use client'

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { SearchVideoItem } from "@/entities/thumbnailVideo/ui/SearchVideoItem";
import { getVideosByName } from "@/shared/api/video/getVideosByName";
import { getChannelDataClient } from "@/shared/hooks/getChannelDataClient";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { InfinityScrollLoader } from "@/shared/ui/InfinityScrollLoader";
import { useRef, useCallback, useEffect } from "react";
import styles from "./styles.module.scss";

export const SearchVideoList = ({query} : {query: string}) => {
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const myChannelData = getChannelDataClient();

    const fetchVideoList = useCallback(async ({offset, limit}: {offset: number, limit: number}) => {
        const res = await getVideosByName({videoName: query, offset, limit});
        return res?.videos || []
    }, [query]);

    useEffect(() => {
        refreshData()
    }, [query])

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfinityScroll<IVideo, string>({
        paginationStep: 15,
        fetchData: fetchVideoList,
        triggerRef: loadingRef
    })

    if (data && data.length < 1) {
        return (
            <div>Ничего не найдено</div>
        )
    }

    return (
        <>
            <div className={styles.videoList}>
                {data.map(i =>
                    <SearchVideoItem key={i.id} video={i} userId={myChannelData?.id || ''} isRow />
                )}
            </div>

            <div
                ref={loadingRef}
                style={{ height: "10px", margin: "10px" }}
            >
                <InfinityScrollLoader isLoading={isLoading} />
          </div>
        </>
    )
}