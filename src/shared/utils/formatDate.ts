export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    // Только что
    if (diffSecs < 60) return 'только что';

    // Минуты
    if (diffMins < 60) {
        return `${diffMins} ${getMinutesDeclension(diffMins)} назад`;
    }

    // Часы
    if (diffHours < 24) {
        return `${diffHours} ${getHoursDeclension(diffHours)} назад`;
    }

    // Дни
    if (diffDays === 1) return 'вчера';
    if (diffDays < 5) return `${diffDays} дня назад`;

    // Недели
    if (diffWeeks < 5) {
        return `${diffWeeks} ${getWeeksDeclension(diffWeeks)} назад`;
    }

    // Месяцы
    if (diffMonths < 12) {
        return `${diffMonths} ${getMonthsDeclension(diffMonths)} назад`;
    }

    // Годы
    return `${diffYears} ${getYearsDeclension(diffYears)} назад`;
};

// Вспомогательные функции для склонений

function getMinutesDeclension(n: number): string {
    if (n % 10 === 1 && n % 100 !== 11) return 'минуту';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'минуты';
    return 'минут';
}

function getHoursDeclension(n: number): string {
    if (n % 10 === 1 && n % 100 !== 11) return 'час';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'часа';
    return 'часов';
}

function getWeeksDeclension(n: number): string {
    if (n % 10 === 1 && n % 100 !== 11) return 'неделю';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'недели';
    return 'недель';
}

function getMonthsDeclension(n: number): string {
    if (n % 10 === 1 && n % 100 !== 11) return 'месяц';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'месяца';
    return 'месяцев';
}

function getYearsDeclension(n: number): string {
    if (n % 10 === 1 && n % 100 !== 11) return 'год';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'года';
    return 'лет';
}