export const isCyrillic = (word: string): boolean => {
  return /^[а-яА-ЯёЁ]+$/.test(word);
};

/**
 * Склоняет слово в зависимости от числа (1, 2-4, 5+)
 * @param word - слово для склонения (в именительном падеже, единственном числе)
 * @param number - число для определения формы
 * @param variants - варианты склонения (опционально)
 * @returns правильная форма слова
 * 
 * @example
 * getWordForm('комментарий', 1) // 'комментарий'
 * getWordForm('комментарий', 2) // 'комментария'
 * getWordForm('комментарий', 5) // 'комментариев'
 * 
 * @example
 * getWordForm('пользователь', 21) // 'пользователь'
 * getWordForm('пользователь', 22) // 'пользователя'
 * getWordForm('пользователь', 25) // 'пользователей'
 */
export const getWordForm = (
  word: string, 
  number: number, 
  variants?: [string, string, string]
): string => {
  // Проверка на кириллицу
  if (!isCyrillic(word)) {
    console.warn(`Слово "${word}" не является кириллическим`);
    return word;
  }

  // Если переданы свои варианты склонения
  if (variants) {
    const [one, two, five] = variants;
    const num = Math.abs(number);
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return five;
    if (lastDigit === 1) return one;
    if (lastDigit >= 2 && lastDigit <= 4) return two;
    return five;
  }

  // Автоматическое склонение
  const num = Math.abs(number);
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  // Исключения для чисел 11-19
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return getPluralForm(word);
  }

  // Для 1 - именительный падеж (единственное число)
  if (lastDigit === 1) {
    return word;
  }

  // Для 2-4 - родительный падеж (единственное число)
  if (lastDigit >= 2 && lastDigit <= 4) {
    return getGenitiveForm(word);
  }

  // Для 5+ - родительный падеж (множественное число)
  return getPluralForm(word);
};

/**
 * Получает форму родительного падежа единственного числа
 * (для чисел 2-4)
 */
const getGenitiveForm = (word: string): string => {
  const lowerWord = word.toLowerCase();
  
  // Исключения
  const exceptions: Record<string, string> = {
    'человек': 'человека',
    'ребенок': 'ребенка',
    'год': 'года',
    'час': 'часа',
    'месяц': 'месяца',
  };

  if (exceptions[lowerWord]) {
    return exceptions[lowerWord];
  }

  // Правила для разных окончаний
  if (lowerWord.endsWith('а') || lowerWord.endsWith('я')) {
    return word; // уже в родительном падеже
  }

  if (lowerWord.endsWith('й')) {
    return word.slice(0, -1) + 'я';
  }

  if (lowerWord.endsWith('ь')) {
    return word.slice(0, -1) + 'я';
  }

  if (lowerWord.endsWith('о') || lowerWord.endsWith('е')) {
    return word.slice(0, -1) + 'а';
  }

  // Для слов, оканчивающихся на согласную
  if (/[бвгджзйклмнпрстфхцчшщ]$/.test(lowerWord)) {
    return word + 'а';
  }

  return word;
};

/**
 * Получает форму родительного падежа множественного числа
 * (для чисел 5+)
 */
const getPluralForm = (word: string): string => {
  const lowerWord = word.toLowerCase();
  
  // Исключения
  const exceptions: Record<string, string> = {
    'человек': 'человек',
    'ребенок': 'детей',
    'год': 'лет',
    'час': 'часов',
    'месяц': 'месяцев',
    'день': 'дней',
    'ночь': 'ночей',
  };

  if (exceptions[lowerWord]) {
    return exceptions[lowerWord];
  }

  // Правила для разных окончаний
  if (lowerWord.endsWith('а')) {
    return word.slice(0, -1) + '';
  }

  if (lowerWord.endsWith('я')) {
    return word.slice(0, -1) + 'ь';
  }

  if (lowerWord.endsWith('ь')) {
    return word.slice(0, -1) + 'ей';
  }

  if (lowerWord.endsWith('й')) {
    return word.slice(0, -1) + 'ев';
  }

  if (lowerWord.endsWith('о')) {
    return word.slice(0, -1) + '';
  }

  if (lowerWord.endsWith('е')) {
    return word.slice(0, -1) + 'й';
  }

  // Для слов, оканчивающихся на согласную
  if (/[бвгджзйклмнпрстфхцчшщ]$/.test(lowerWord)) {
    // Специальные правила для шипящих
    if (/[жшчщ]$/.test(lowerWord)) {
      return word + 'ей';
    }
    return word + 'ов';
  }

  return word;
};

// Улучшенная версия с поддержкой кастомных слов
export const getWordFormAdvanced = (
  word: string,
  number: number,
  customForms?: {
    one?: string;    // для 1
    two?: string;    // для 2-4
    five?: string;   // для 5+
  }
): string => {
  // Проверка на кириллицу
  if (!isCyrillic(word)) {
    console.warn(`Слово "${word}" не является кириллическим`);
    return word;
  }

  const num = Math.abs(number);
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  // Используем кастомные формы если они переданы
  if (customForms) {
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return customForms.five || getPluralForm(word);
    }
    if (lastDigit === 1) {
      return customForms.one || word;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return customForms.two || getGenitiveForm(word);
    }
    return customForms.five || getPluralForm(word);
  }

  // Стандартная логика
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return getPluralForm(word);
  }
  if (lastDigit === 1) {
    return word;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return getGenitiveForm(word);
  }
  return getPluralForm(word);
};

// Пример использования:
/*
console.log(getWordForm('комментарий', 1));  // комментарий
console.log(getWordForm('комментарий', 2));  // комментария
console.log(getWordForm('комментарий', 5));  // комментариев

console.log(getWordForm('пользователь', 1)); // пользователь
console.log(getWordForm('пользователь', 3)); // пользователя
console.log(getWordForm('пользователь', 10)); // пользователей

// С кастомными формами
console.log(getWordFormAdvanced('день', 1, { one: 'день', two: 'дня', five: 'дней' }));
// день, дня, дней

// Проверка на кириллицу
console.log(getWordForm('user', 2)); // Вернет 'user' с предупреждением
*/