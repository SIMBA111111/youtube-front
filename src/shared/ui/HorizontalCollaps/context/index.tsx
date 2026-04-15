// HorizontalCollaps.tsx
"use client"

import React, { useState, createContext, useContext } from 'react'

interface IHorizontalCollapsContext {
    isOpened: boolean
    toggle: () => void
}

const HorizontalCollapsContext = createContext<IHorizontalCollapsContext | null>(null)

export const useHorizontalCollaps = () => {
    const context = useContext(HorizontalCollapsContext)
    if (!context) {
        throw new Error('useHorizontalCollaps must be used within HorizontalCollaps')
    }
    return context
}

interface IHorizontalCollaps {
    children: React.ReactNode
    defaultOpen?: boolean
    className?: string
}

export const HorizontalCollaps: React.FC<IHorizontalCollaps> = ({
    children,
    defaultOpen = false,
    className = '',
}) => {
    const [isOpened, setIsOpened] = useState(defaultOpen)

    const toggle = () => setIsOpened(!isOpened)

    return (
        <HorizontalCollapsContext.Provider value={{ isOpened, toggle }}>
            <div className={className}>
                {children}
            </div>
        </HorizontalCollapsContext.Provider>
    )
}