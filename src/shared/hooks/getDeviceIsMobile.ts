import { useState, useEffect } from "react";

export const useDeviceIsMobile = () => {
    const [device, setDevice] = useState({
        isTablet: false,
        isMobile: false
    });

    useEffect(() => {
        // Функция для определения размера экрана
        const checkDevice = () => {
            const isTablet = window.matchMedia('(max-width: 1280px)').matches;
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            
            setDevice({
                isTablet,
                isMobile
            });
        };

        // Проверяем при монтировании
        checkDevice();

        // Добавляем слушатель изменения размера
        window.addEventListener('resize', checkDevice);

        // Очищаем слушатель при размонтировании
        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []); // Пустой массив зависимостей - эффект выполнится один раз

    return device;
};