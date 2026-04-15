// HorizontalCollaps.Header.tsx
"use client"

import React from 'react'
import styles from './styles.module.scss'
import { useHorizontalCollaps } from '../context'
import { Svg } from '../../Svg'

interface IHorizontalCollapsHeader {
    children: React.ReactNode
    className?: string
}

export const HorizontalCollapsHeader: React.FC<IHorizontalCollapsHeader> = ({
    children,
    className = '',
}) => {
    const { toggle, isOpened } = useHorizontalCollaps()

    return (
        <div className={`${styles.header} ${className}`} onClick={toggle}>
            {children}
        </div>
    )
}