'use client'

import { IVideoEntity, IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
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
        
        if (res.error || !res.data) {
            return []
        }
        
        return res.data || []
    }, [query]);

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfinityScroll<IVideoFullInfo, string>({
        paginationStep: 15,
        fetchData: fetchVideoList,
        triggerRef: loadingRef
    })

    useEffect(() => {
        refreshData()
    }, [query])

    console.log(data);
    

    if (data && data.length < 1) {
        return (
            <div>Ничего не найдено</div>
        )
    }

    return (
        <>
            <div className={styles.videoList}>
                {data.map(i =>
                    <SearchVideoItem key={i.video.id} video={i} userId={myChannelData?.id || ''} isRow />
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