import { RefObject, useEffect, useRef, useState } from "react";

interface IFetchDataArgs<Y> {
    offset: number;
    limit: number;
}

interface IUseInfitityScroll<T, Y> {
    paginationStep: number;
    filter: Y;
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

export const useInfitityScroll = <T, Y>({
    paginationStep,
    filter,
    fetchData,
    triggerRef,
}: IUseInfitityScroll<T, Y>): IHookResponse<T> => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState({ offset: 0, limit: paginationStep });
    
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isFetchingRef = useRef<boolean>(false);
    const isInitialMountRef = useRef<boolean>(true);

    // ✅ Основная функция загрузки данных
    const loadData = async (offset: number, limit: number) => {
        if (isFetchingRef.current) return;
        
        isFetchingRef.current = true;
        setIsLoading(true);

        try {
            const res = await fetchData({
                offset,
                limit,
                // filter,
            });

            if (!res || res.length === 0) {
                setHasMore(false);
                return;
            }

            if (res && res.length < paginationStep) {
                setData(prev => [...prev, ...res]);
                setHasMore(false);
                return;
            }

            setData(prev => [...prev, ...res]);
            setPagination(prev => ({
                offset: prev.offset + paginationStep,
                limit: prev.limit + paginationStep,
            }));

        } catch (error) {
            console.error("ОШИБКА ЗАГРУЗКИ:", error);
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    };

    // ✅ Callback для IntersectionObserver
    const callback = async (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];

        if (!entry.isIntersecting || isLoading || !hasMore || isFetchingRef.current) {
            return;
        }

        // Пропускаем первое срабатывание при монтировании
        if (isInitialMountRef.current) {
            isInitialMountRef.current = false;
            return;
        }

        await loadData(pagination.offset, pagination.limit);
    };

    // ✅ Настройка IntersectionObserver
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
    }, [hasMore, pagination.offset, filter, triggerRef.current]);

    // ✅ Первоначальная загрузка и сброс при смене фильтра
    useEffect(() => {
        const resetAndLoad = async () => {
            // Отключаем observer
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }

            // Сбрасываем состояние
            setData([]);
            setPagination({ offset: 0, limit: paginationStep });
            setHasMore(true);
            isInitialMountRef.current = true;
            isFetchingRef.current = false;

            // Загружаем первую порцию
            await loadData(0, paginationStep);
            isInitialMountRef.current = false;
        };

        resetAndLoad();
    }, [filter])

    // ✅ Функция для ручного обновления (например, после добавления комментария)
    const refreshData = async () => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        setData([]);
        setPagination({ offset: 0, limit: paginationStep });
        setHasMore(true);
        isInitialMountRef.current = true;
        isFetchingRef.current = false;

        await loadData(0, paginationStep);
        isInitialMountRef.current = false;
    };

    return { 
        data, 
        isLoading, 
        hasMore, 
        refreshData 
    };
};