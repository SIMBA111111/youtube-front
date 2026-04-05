"use client"

import React, { useState } from 'react'
import styles from './styles.module.scss'

interface IAccordionProps {
    header: React.ReactNode          // кастомный хедер
    children: React.ReactNode        // контент
    footer?: React.ReactNode         // кастомный футер (опционально)
    defaultOpen?: boolean
    className?: string
    onHeaderClick?: () => void       // колбэк при клике на хедер
    onFooterClick?: () => void       // колбэк при клике на футер
}

export const Accordion: React.FC<IAccordionProps> = ({
    header,
    children,
    footer,
    defaultOpen = false,
    className = '',
    onHeaderClick,
    onFooterClick
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const handleHeaderClick = () => {
        setIsOpen(!isOpen)
        onHeaderClick?.()
    }

    const handleFooterClick = () => {
        setIsOpen(false)  // закрываем при клике на футер
        onFooterClick?.()
    }

    return (
        <div className={`${styles.accordion} ${className}`}>
            <div 
                className={styles.accordion_header}
                onClick={handleHeaderClick}
            >
                {header}
            </div>

            <div className={`${styles.accordion_content} ${isOpen ? styles.open : ''}`}>
                <div className={styles.accordion_body}>
                    {children}
                </div>
                
                {footer && isOpen && (
                    <div 
                        className={styles.accordion_footer}
                        onClick={handleFooterClick}
                    >
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}