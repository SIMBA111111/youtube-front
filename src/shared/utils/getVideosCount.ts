export const getVideosCount = (device: any) => {
    switch (true) {
        case device.isMobile === true:
            return 1
        case device.isTablet === true:
            return 2
        default:
            return 3
    }
}