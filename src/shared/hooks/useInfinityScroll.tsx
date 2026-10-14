'use client'

import { RefObject, useCallback, useEffect, useRef, useState } from "react";

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
    threshold: 0,
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

    const paginationRef = useRef(pagination);
    const hasMoreRef = useRef(true);
    const isFetchingRef = useRef(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // синхронизация пагинации
    useEffect(() => {
        paginationRef.current = pagination;
    }, [pagination]);

    const loadData = useCallback(async (offset: number, limit: number) => {
        if (isFetchingRef.current) return;

        isFetchingRef.current = true;
        setIsLoading(true);

        try {
            const res = await fetchData({ offset, limit, filter });

            if (!res || res.length === 0) {
                hasMoreRef.current = false;
                setHasMore(false);
                return;
            }

            setData(prev => [...prev, ...res]);

            if (res.length < paginationStep) {
                hasMoreRef.current = false;
                setHasMore(false);
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
    }, [fetchData, filter, paginationStep]);

    // callback через реф, чтобы observer всегда видел свежую версию
    const callbackRef = useRef<(entries: IntersectionObserverEntry[]) => void>(() => {});

    useEffect(() => {
        callbackRef.current = async (entries) => {
            const entry = entries[0];
            if (!entry.isIntersecting) return;
            if (isFetchingRef.current) return;
            if (!hasMoreRef.current) return;

            const { offset, limit } = paginationRef.current;
            await loadData(offset, limit);
        };
    }, [loadData]);

    useEffect(() => {
        const el = triggerRef.current;
        if (!el) return;

        observerRef.current = new IntersectionObserver(
            (entries) => callbackRef.current(entries),
            options
        );
        observerRef.current.observe(el);

        return () => {
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, [triggerRef]);

    const refreshData = useCallback(async () => {
        observerRef.current?.disconnect();
        observerRef.current = null;

        setData([]);
        setPagination({ offset: 0, limit: paginationStep });
        paginationRef.current = { offset: 0, limit: paginationStep };
        hasMoreRef.current = true;
        setHasMore(true);

        await loadData(0, paginationStep);

        // переподключаем observer после сброса
        if (triggerRef.current) {
            observerRef.current = new IntersectionObserver(
                (entries) => callbackRef.current(entries),
                options
            );
            observerRef.current.observe(triggerRef.current);
        }
    }, [loadData, paginationStep, triggerRef]);

    return { data, isLoading, hasMore, refreshData };
};