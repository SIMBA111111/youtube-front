export const formatViews = (views: number): string => {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1).replace('.0', '') + ' млн';
    }
    if (views >= 1000) {
        return (views / 1000).toFixed(1).replace('.0', '') + ' тыс';
    }
    return views?.toString();
};