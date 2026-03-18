export const getDeviceIsMobile = () => {
    if (typeof window === 'undefined') {
        console.log("Speech Recognition недоступен на сервере");
        return;
    }
        
    const mediaQuery = window.matchMedia('(max-width: 1280px)')
    
    if (mediaQuery.matches) {
        return mediaQuery.matches
    } else {
        return false
    }
}