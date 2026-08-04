'use client'

import { IVideo } from "@/entities/thumbnailVideo/modal/types";
import { SearchVideoItem } from "@/entities/thumbnailVideo/ui/SearchVideoItem";
import { getVideos } from "@/shared/api/video/getVideoList";
import { getVideosByName } from "@/shared/api/video/getVideosByName";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Spinner } from "@/shared/ui";
import { useRef, useCallback } from "react";

export const SearchVideoList = ({query} : {query: string}) => {
    const loadingRef = useRef<HTMLDivElement | null>(null);

    const fetchVideoList = useCallback(async ({offset, limit}: {offset: number, limit: number}) => {
        const res = await getVideosByName({videoName: query, offset, limit});
        return res?.videos || []
    }, [query]);

    const {
        data,
        hasMore,
        isLoading,
        refreshData
    } = useInfinityScroll<IVideo, string>({
        paginationStep: 5,
        filter: '',
        fetchData: fetchVideoList,
        triggerRef: loadingRef
    })

    return (
        <div>
            {data.map(i =>
                <SearchVideoItem video={i} isRow/>
            )}

            <div
                ref={loadingRef}
                style={{ height: "60px", margin: "20px" }}
            >
                {isLoading &&
                    <Spinner size={32}/>
                }
          </div>
        </div>
    )
}