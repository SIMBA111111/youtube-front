'use client'

import { useEffect, useRef } from "react"
import Chart from 'chart.js/auto'
import { ChartingTooltip } from "@/shared/ui"

interface IChannelAnalytics<TLabels, TValues> {
    userId: string
    labels: TLabels[]
    values: TValues[]
    min: number
    max: number
}

export const Analytics = <TLabels, TValues> ({ 
    labels,
    values,
    userId,
    min,
    max
 }: IChannelAnalytics<TLabels, TValues>) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const chartRef = useRef<Chart | null>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        
        // Создаем элемент для тултипа
        const tooltipEl = document.createElement('div')
        tooltipEl.style.cssText = `
            position: fixed;
            background: white;
            border-radius: 8px;
            padding: 12px 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.15s ease;
            font-family: -apple-system, Roboto, sans-serif;
            z-index: 1000;
            border: 1px solid rgba(0,0,0,0.05);
        `
        document.body.appendChild(tooltipEl)
        tooltipRef.current = tooltipEl

        chartRef.current = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#ff4444',
                    pointHoverBorderColor: 'white',
                    pointHoverBorderWidth: 2,
                    borderColor: '#ff4444',
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: (context: any) => {
                        const chart = context.chart
                        const {ctx, chartArea} = chart
                        if (!chartArea) return 'rgba(255,68,68,0)'
                        
                        const gradient = ctx.createLinearGradient(
                            0, chartArea.top, 0, chartArea.bottom
                        )
                        gradient.addColorStop(0, 'rgba(255, 106, 106, 0.3)')
                        gradient.addColorStop(0.5, 'rgba(255, 106, 106,0.2)')
                        gradient.addColorStop(1, 'rgba(255, 198, 198, 0.1)')
                        return gradient
                    },
                    // tension: 0.1,
                    spanGaps: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false, // Отключаем встроенный тултип
                        external: (context: any) => {
                            ChartingTooltip({context, tooltipRef})
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'category', // 👈 Используем category вместо time
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 7,
                            color: '#606060',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        min: min,
                        max: max,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            color: '#606060',
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8,
                        hoverBorderWidth: 1,
                    }
                }
            }
        })

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy()
            }
            if (tooltipRef.current && tooltipRef.current.parentNode) {
                tooltipRef.current.parentNode.removeChild(tooltipRef.current)
            }
        }
    }, [values, labels, min, max])

    return (
        <div style={{ width: '100%', maxWidth: 900, height: 400 }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    )
}