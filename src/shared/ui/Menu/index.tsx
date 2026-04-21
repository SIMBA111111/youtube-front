'use client'

import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { time } from "console";

interface PopoverProps {
    children: ReactNode;
    isOpened?: any;
    onClose?: () => void;
    offset?: number;
    className?: string;
    delay?: number
}

export const Menu = ({
    children,
    isOpened: externalIsOpen,
    onClose,
    offset = 8,
    className = "",
    delay = 300
}: PopoverProps) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [popoverStyle, setPopoverStyle] = useState({});
    
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

    const handleClose = useCallback(() => {
        if (externalIsOpen === undefined) {
            setInternalIsOpen(false);
        }
        onClose?.();
    }, [externalIsOpen, onClose]);

    // Исправленный расчет позиции с учетом границ экрана
    const calculatePosition = useCallback(() => {
        if (!triggerRef.current || !popoverRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let finalStyle = {};
        let bestPosition: "top" | "bottom" | "left" | "right" = "left";

        // Проверяем доступное пространство
        const spaceTop = triggerRect.top;
        const spaceBottom = viewportHeight - triggerRect.bottom;
        const spaceLeft = triggerRect.left;
        const spaceRight = viewportWidth - triggerRect.right;

        // Приоритет: left (слева) → right (справа) → bottom (снизу) → top (сверху)
        const positions = [
            { 
                pos: "left" as const, 
                fits: spaceLeft >= popoverRect.width + offset,
                priority: 4
            },
            { 
                pos: "right" as const, 
                fits: spaceRight >= popoverRect.width + offset,
                priority: 3
            },
            { 
                pos: "bottom" as const, 
                fits: spaceBottom >= popoverRect.height + offset,
                priority: 2
            },
            { 
                pos: "top" as const, 
                fits: spaceTop >= popoverRect.height + offset,
                priority: 1
            },
        ];

        const fittingPosition = positions.find(p => p.fits);
        
        if (fittingPosition) {
            bestPosition = fittingPosition.pos;
        } else {
            // Если нигде не помещается, выбираем где больше места
            const spaces = {
                left: spaceLeft,
                right: spaceRight,
                bottom: spaceBottom,
                top: spaceTop
            };
            bestPosition = Object.keys(spaces).reduce((a, b) => 
                spaces[a as keyof typeof spaces] > spaces[b as keyof typeof spaces] ? a : b
            ) as "top" | "bottom" | "left" | "right";
        }

        // Расчет позиции с учетом границ экрана
        switch (bestPosition) {
            case "left": {
                let top = triggerRect.top + triggerRect.height / 2;
                const minTop = offset;
                const maxTop = viewportHeight - popoverRect.height - offset;
                top = Math.max(minTop, Math.min(maxTop, top - popoverRect.height / 2));
                
                finalStyle = {
                    right: viewportWidth - triggerRect.left + offset,
                    top: top,
                };
                break;
            }
            case "right": {
                let top = triggerRect.top + triggerRect.height / 2;
                const minTop = offset;
                const maxTop = viewportHeight - popoverRect.height - offset;
                top = Math.max(minTop, Math.min(maxTop, top - popoverRect.height / 2));
                
                finalStyle = {
                    left: triggerRect.right + offset,
                    top: top,
                };
                break;
            }
            case "bottom": {
                let left = triggerRect.left + triggerRect.width / 2;
                const minLeft = offset;
                const maxLeft = viewportWidth - popoverRect.width - offset;
                left = Math.max(minLeft, Math.min(maxLeft, left - popoverRect.width / 2));
                
                finalStyle = {
                    top: triggerRect.bottom + offset,
                    left: left,
                };
                break;
            }
            case "top": {
                let left = triggerRect.left + triggerRect.width / 2;
                const minLeft = offset;
                const maxLeft = viewportWidth - popoverRect.width - offset;
                left = Math.max(minLeft, Math.min(maxLeft, left - popoverRect.width / 2));
                
                finalStyle = {
                    bottom: viewportHeight - triggerRect.top + offset,
                    left: left,
                };
                break;
            }
        }

        setPopoverStyle(finalStyle);
    }, [offset]);

    // Закрытие при клике вне и ресайзе
    useEffect(() => {
        if (!isOpen) return;

        const handleResize = () => {
            calculatePosition();
        };

        calculatePosition();
        
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleResize);
        };
    }, [isOpen, calculatePosition, handleClose]);


    // Пересчет позиции при изменении контента
    useEffect(() => {
        if (isOpen) {
            const observer = new ResizeObserver(() => {
                calculatePosition();
            });
            
            if (popoverRef.current) {
                observer.observe(popoverRef.current);
            }
            
            return () => observer.disconnect();
        }
    }, [isOpen, calculatePosition]);

    return (
        <>
            <div ref={triggerRef} className={`${styles.popoverTrigger}`} />

            {isOpen && createPortal(
                <div
                    ref={popoverRef}
                    className={`${styles.popover} ${className}`}
                    style={popoverStyle}
                >
                    {children}
                </div>,
                document.body
            )}
        </>
    );
};