'use client'

import { useState, useEffect } from "react";

export const useDeviceIsMobile = () => {
    const [device, setDevice] = useState({
        isTablet: false,
        isMobile: false
    });

    useEffect(() => {
        const mediaQueryTablet = window.matchMedia('(max-width: 1280px)');
        const mediaQueryMobile = window.matchMedia('(max-width: 768px)');

        const checkDevice = () => {
            const isTablet = mediaQueryTablet.matches;
            const isMobile = mediaQueryMobile.matches;
            
            setDevice(prev => {
                if (prev.isTablet === isTablet && prev.isMobile === isMobile) {
                    return prev;
                }
                return { isTablet, isMobile };
            });
        };

        checkDevice();

        // Событие change у matchMedia срабатывает только при изменении, а не на каждый resize
        mediaQueryTablet.addEventListener('change', checkDevice);
        mediaQueryMobile.addEventListener('change', checkDevice);

        return () => {
            mediaQueryTablet.removeEventListener('change', checkDevice);
            mediaQueryMobile.removeEventListener('change', checkDevice);
        };
    }, []);

    return device;
};