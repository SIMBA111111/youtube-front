export const getShortsCount = (device: any) => {
    switch (true) {
        case device.isMobile === true:
            return 2
        case device.isTablet === true:
            return 3
        default:
            return 5
    }
}