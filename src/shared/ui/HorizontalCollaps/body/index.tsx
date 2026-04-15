// HorizontalCollaps.Body.tsx
"use client"

import React from 'react'
import styles from './styles.module.scss'
import { useHorizontalCollaps } from '../context'
import { Svg } from '../../Svg'
import { Text } from '../../Text'

interface IHorizontalCollapsBody {
    children: React.ReactNode
    className?: string
}

export const HorizontalCollapsBody: React.FC<IHorizontalCollapsBody> = ({
    children,
    className = '',
}) => {
    const { isOpened, toggle } = useHorizontalCollaps()

    return (
        <div className={`${styles.body} ${className}`}>
            <div className={`${styles.accordion_content} ${isOpened ? styles.open : ''}`}>
                {children}
            </div>
            <button className={`${styles.accordion_btn_wrap}`} onClick={toggle}>
                {isOpened ? (
                        <div className={`${styles.accordion_btn}`}>
                            <Text>Свернуть</Text>
                            <Svg name='shortArrowUp' color='black'/>
                        </div>
                ) : (
                    <div className={`${styles.accordion_btn}`}>
                        <Text>Еще</Text>
                        <Svg name='shortArrowDown' color='black'/>
                    </div>
                )}
            </button>
        </div>
    )
}