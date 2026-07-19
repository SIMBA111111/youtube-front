'use client'

import { useState, useEffect, useRef } from "react";

export const useDeviceIsMobile = () => {
    const [device, setDevice] = useState({
        isTablet: false,
        isMobile: false
    });
    const isFirstRender = useRef(true);

    useEffect(() => {
        const checkDevice = () => {
            const isTablet = window.matchMedia('(max-width: 1280px)').matches;
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            
            setDevice(prev => {
                // Обновляем только если изменилось
                if (prev.isTablet === isTablet && prev.isMobile === isMobile) {
                    return prev;
                }
                return { isTablet, isMobile };
            });
        };

        checkDevice();

        const debounce = setTimeout(() => {
            window.addEventListener('resize', checkDevice);
        }, 100);

        return () => {
            clearTimeout(debounce);
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    return device;
};