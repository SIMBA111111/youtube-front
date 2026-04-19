interface IWithDateViewed {
    dateViewed: string;
    [key: string]: any;
}

export const splitEntitiesByDays = <T extends IWithDateViewed>(
    items: T[]
): Map<string, T[]> => {
    const daysMap = new Map<string, T[]>();

    items.forEach(item => {
        const date = new Date(item.dateViewed);
        const day = date.getDate();
        const month = date.toLocaleString('ru', { month: 'short' });
        const dateKey = `${day} ${month}`;
        
        if (!daysMap.has(dateKey)) {
            daysMap.set(dateKey, []);
        }
        
        daysMap.get(dateKey)!.push(item);
    });

    return daysMap;
};