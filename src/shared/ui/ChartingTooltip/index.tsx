import { formatViews } from "@/shared/utils/formatViews";
import { RefObject } from "react";

interface IChartingTooltip {
    context: any,
    tooltipRef: RefObject<HTMLDivElement | null>
}

export const ChartingTooltip = ({context, tooltipRef}: IChartingTooltip) => {
    if (!tooltipRef.current) return 
    
    const tooltip = context.tooltip
    const chart = context.chart

    if (!tooltip || !tooltip.dataPoints?.length) {
        tooltipRef.current.style.opacity = '0'
        return
    }

    const dataPoint = tooltip.dataPoints[0]
    const value = dataPoint.parsed.y
    const label = dataPoint.label // Берем дату из label
    
    // Форматируем данные
    const formattedValue = formatViews(value)
    
    // Получаем позицию
    const rect = chart.canvas.getBoundingClientRect()
    const position = rect.left + tooltip.caretX
    const yPosition = rect.top + tooltip.caretY

    // Создаем контент как на YouTube
    tooltipRef.current.innerHTML = `
        <div style="font-size: 13px; color: #606060; margin-bottom: 4px;">
            ${label}
        </div>
        <div style="font-size: 20px; font-weight: 500; color: #030303;">
            ${formattedValue}
            <span style="font-size: 14px; font-weight: 400; color: #606060; margin-left: 4px;">
                просмотров
            </span>
        </div>
        <div style="font-size: 12px; color: #606060; margin-top: 4px;">
            ▲ ${((value / 10) * 100).toFixed(0)}% от максимума
        </div>
    `

    // Позиционируем тултип
    const tooltipWidth = 200
    const tooltipHeight = 80
    
    let left = position - tooltipWidth / 2
    let top = yPosition - tooltipHeight - 20

    // Корректируем позицию, чтобы не выходил за экран
    if (left < 10) left = 10
    if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10
    }
    if (top < 10) {
        top = yPosition + 20 // Показываем снизу
    }

    tooltipRef.current.style.left = left + 'px'
    tooltipRef.current.style.top = top + 'px'
    tooltipRef.current.style.opacity = '1'
}