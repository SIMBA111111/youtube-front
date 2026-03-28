export const getDeviceIsMobile = () => {
    if (typeof window === 'undefined') {
        console.log("getDeviceIsMobile недоступен на сервере");
        return;
    }
        
    const tabletMediaQuery = window.matchMedia('(max-width: 1280px)')
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)')
    
    return {isTablet: tabletMediaQuery.matches || false, isMobile: mobileMediaQuery.matches || false}
}