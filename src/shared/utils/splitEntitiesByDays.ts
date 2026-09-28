export const splitVideoEntitiesByDays = <T extends { video: { dateViewed: string } }>(
    items: T[]
): Map<string, T[]> => {
    const daysMap = new Map<string, T[]>();

    items.forEach(item => {
        const date = new Date(item.video.dateViewed);
        const day = date.getDate();
        const month = date.toLocaleString('ru', { month: 'short' });
        const year = date.getFullYear();
        const dateKey = `${day} ${month} ${year}`;

        if (!daysMap.has(dateKey)) {
            daysMap.set(dateKey, []);
        }

        daysMap.get(dateKey)!.push(item);
    });

    return daysMap;
};