'use client'

import { RefObject, useEffect, useRef, useState } from "react";

interface IFetchDataArgs<Y> {
    offset: number;
    limit: number;
    filter?: Y;
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
    
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isFetchingRef = useRef<boolean>(false);
    const initializedRef = useRef<boolean>(false);
    const loadCountRef = useRef<number>(0); // ✅ Счетчик загрузок

    const loadData = async (offset: number, limit: number) => {
        if (isFetchingRef.current) return;
        
        isFetchingRef.current = true;
        setIsLoading(true);

        try {
            const res = await fetchData({
                offset,
                limit,
                filter,
            });

            if (!res || res.length === 0) {
                setHasMore(false);
                return;
            }

            setData(prev => [...prev, ...res]);

            if (res.length < paginationStep) {
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
    };

    const callback = async (entries: IntersectionObserverEntry[]) => {
        console.log('callback');
        
        const entry = entries[0];

        if (!entry.isIntersecting || isLoading || !hasMore || isFetchingRef.current) {
            return;
        }

        // ✅ Если еще не инициализировались - пропускаем
        if (!initializedRef.current) {
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
    }, [hasMore, pagination.offset, triggerRef.current]);

    // ✅ Первоначальная загрузка - только один раз
    // TO DO тут есть вопросик - проверки на initializedRef и loadCountRef порят обновление данных при смене filter.
    // Но без них при маленьком paginationStep появляются дубли
    
    useEffect(() => {
        // ✅ Увеличиваем счетчик
        loadCountRef.current += 1;
        
        // ✅ Если это второй вызов (из-за строгого режима) - пропускаем
        // if (loadCountRef.current > 1) {
        //     initializedRef.current = true;
        //     return;
        // }

        const loadInitialData = async () => {
            setData([]);
            setPagination({ offset: 0, limit: paginationStep });
            setHasMore(true);
            
            await loadData(0, paginationStep);
            
            // ✅ Отмечаем, что инициализация завершена
            initializedRef.current = true;
        };

        loadInitialData();

        // ✅ Очистка при размонтировании
        return () => {
            // Ничего не делаем
        };
    }, [filter]); // ✅ Зависимость от filter

    const refreshData = async () => {
        // ✅ Сбрасываем флаг инициализации
        initializedRef.current = false;
        loadCountRef.current = 0;

        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        setData([]);
        setPagination({ offset: 0, limit: paginationStep });
        setHasMore(true);

        await loadData(0, paginationStep);
        
        initializedRef.current = true;
    };

    return { 
        data, 
        isLoading, 
        hasMore, 
        refreshData 
    };
};