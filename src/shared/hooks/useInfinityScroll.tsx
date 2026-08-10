'use client'

import { RefObject, useEffect, useRef, useState } from "react";

interface IFetchDataArgs<Y> {
    offset: number;
    limit: number;
    filter?: Y;
}

interface IUseInfitityScroll<T, Y> {
    paginationStep: number;
    filter?: Y;
    fetchData: (args: IFetchDataArgs<Y>) => Promise<T[]>;
    triggerRef: RefObject<HTMLElement | null>;
}

interface IHookResponse<T> {
    data: T[];
    isLoading: boolean;
    hasMore: boolean;
    refreshData: () => Promise<void>;
}

const options = {
    root: null,
    rootMargin: "100px",
    threshold: 0.1,
};

export const useInfinityScroll = <T, Y>({
    paginationStep,
    filter,
    fetchData,
    triggerRef,
}: IUseInfitityScroll<T, Y>): IHookResponse<T> => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState({ offset: 0, limit: paginationStep });
    
    // ✅ Реф для актуальных значений пагинации
    const paginationRef = useRef(pagination);
    
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isFetchingRef = useRef<boolean>(false);

    // ✅ Синхронизируем реф с состоянием
    useEffect(() => {
        paginationRef.current = pagination;
    }, [pagination]);

    const loadData = async (offset: number, limit: number) => {
        if (isFetchingRef.current) return;
        
        isFetchingRef.current = true;
        // setIsLoading(true);

        try {
            const res = await fetchData({
                offset,
                limit,
                filter,
            });

            if (!res || res.length === 0) {
                setHasMore(false);
                setIsLoading(false)
                return;
            }

            setData(prev => [...prev, ...res]);

            if (res.length < paginationStep) {
                setHasMore(false);
                setIsLoading(false)
            } else {
                setPagination(prev => ({
                    offset: prev.offset + paginationStep,
                    limit: prev.limit + paginationStep,
                }));
            }

        } catch (error) {
            console.error("ОШИБКА ЗАГРУЗКИ:", error);
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    };

    // ✅ callback использует paginationRef для получения актуальных значений
    const callback = async (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        
        if (!entry.isIntersecting || isLoading || !hasMore || isFetchingRef.current) {
            return;
        }

        // ✅ Берем актуальные значения из рефа
        const { offset, limit } = paginationRef.current;
        await loadData(offset, limit);
    };

    // ✅ Настройка IntersectionObserver с обновленным callback
    useEffect(() => {
        if (!triggerRef.current || !hasMore) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        observerRef.current = new IntersectionObserver(callback, options);
        observerRef.current.observe(triggerRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [hasMore, triggerRef.current]); // ✅ Убираем pagination из зависимостей

    const refreshData = async () => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        setData([]);
        setPagination({ offset: 0, limit: paginationStep });
        setHasMore(true);

        await loadData(0, paginationStep);
    };

    return { 
        data, 
        isLoading, 
        hasMore, 
        refreshData 
    };
};