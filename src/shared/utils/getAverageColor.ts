export const getAverageColor = (img: HTMLImageElement): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return 'rgb(249, 98, 98)';
    
    // Уменьшаем размер для производительности
    const size = 100;
    canvas.width = size;
    canvas.height = size;
    
    // Рисуем изображение на canvas
    ctx.drawImage(img, 0, 0, size, size);
    
    // Получаем все пиксели
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    
    let r = 0, g = 0, b = 0;
    let pixelCount = 0;
    
    // Суммируем все RGB значения
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];     // Red
        g += data[i + 1]; // Green
        b += data[i + 2]; // Blue
        pixelCount++;
    }
    
    // Вычисляем среднее
    const avgR = Math.floor(r / pixelCount);
    const avgG = Math.floor(g / pixelCount);
    const avgB = Math.floor(b / pixelCount);
    
    return `rgb(${avgR}, ${avgG}, ${avgB}, 0.2)`;
};