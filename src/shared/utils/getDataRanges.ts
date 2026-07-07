export type AnalyticsDateRange = 
  | 'lastDay'
  | 'lastThreeDay'
  | 'last7Day'
  | 'last28Day'
  | 'lastHalfYear'
  | 'lastYear'
  | 'allTime';

export const getAnalyticsDataLabel = (range: AnalyticsDateRange): string => {
  const labels: Record<AnalyticsDateRange, string> = {
    lastDay: 'Последний день',
    lastThreeDay: 'Последние 3 дня',
    last7Day: 'Последние 7 дней',
    last28Day: 'Последние 28 дней',
    lastHalfYear: 'Последние полгода',
    lastYear: 'Последний год',
    allTime: 'Всё время'
  };
  return labels[range];
};