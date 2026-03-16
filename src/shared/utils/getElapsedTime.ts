export const getFormatRelativeTime = (dateString: string): Promise<string> => {
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
        throw new Error('Неверный формат даты');
    }
    
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // Массивы для склонения слов
    const minutes: [string, string, string] = ['минуту', 'минуты', 'минут'];
    const hours: [string, string, string] = ['час', 'часа', 'часов'];
    const days: [string, string, string] = ['день', 'дня', 'дней'];
    const months: [string, string, string] = ['месяц', 'месяца', 'месяцев'];
    const years: [string, string, string] = ['год', 'года', 'лет'];
    
    // Функция для склонения слов
    function getDeclension(num: number, forms: [string, string, string]): string {
        const absNum = Math.abs(num);
        const lastDigit = absNum % 10;
        const lastTwoDigits = absNum % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return forms[2];
        }
        
        if (lastDigit === 1) {
            return forms[0];
        }
        
        if (lastDigit >= 2 && lastDigit <= 4) {
            return forms[1];
        }
        
        return forms[2];
    }
    
    // Меньше минуты
    if (diffInSeconds < 60) {
        return 'только что';
    }
    
    // Меньше часа
    if (diffInSeconds < 3600) {
        const minutesCount = Math.floor(diffInSeconds / 60);
        const declension = getDeclension(minutesCount, minutes);
        return `${minutesCount} ${declension} назад`;
    }
    
    // Меньше дня
    if (diffInSeconds < 86400) {
        const hoursCount = Math.floor(diffInSeconds / 3600);
        const declension = getDeclension(hoursCount, hours);
        return `${hoursCount} ${declension} назад`;
    }
    
    // Меньше месяца (30 дней)
    if (diffInSeconds < 2592000) { // 30 * 24 * 60 * 60
        const daysCount = Math.floor(diffInSeconds / 86400);
        const declension = getDeclension(daysCount, days);
        return `${daysCount} ${declension} назад`;
    }
    
    // Меньше года
    if (diffInSeconds < 31536000) { // 365 * 24 * 60 * 60
        const monthsCount = Math.floor(diffInSeconds / 2592000);
        const declension = getDeclension(monthsCount, months);
        return `${monthsCount} ${declension} назад`;
    }
    
    // Больше года
    const yearsCount = Math.floor(diffInSeconds / 31536000);
    const declension = getDeclension(yearsCount, years);
    return `${yearsCount} ${declension} назад`;
}