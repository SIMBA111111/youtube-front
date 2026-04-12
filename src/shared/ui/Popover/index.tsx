'use client'

import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

interface PopoverProps {
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    offset?: number;
    className?: string;
    closeOnScroll?: boolean; // закрывать при скролле
}

export const Popover = ({
    children,
    isOpen: externalIsOpen,
    onClose,
    offset = 8,
    className = "",
    closeOnScroll = true, // по умолчанию закрываем при скролле
}: PopoverProps) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [position, setPosition] = useState<"top" | "bottom" | "left" | "right">("bottom");
    const [popoverStyle, setPopoverStyle] = useState({});
    
    const triggerRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout>(null);

    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

    // Закрытие поповера
    const handleClose = useCallback(() => {
        if (externalIsOpen === undefined) {
            setInternalIsOpen(false);
        }
        onClose?.();
    }, [externalIsOpen, onClose]);

    // Автоматическое определение позиции
    const calculatePosition = useCallback(() => {
        if (!triggerRef.current || !popoverRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const spaceTop = triggerRect.top;
        const spaceBottom = viewportHeight - triggerRect.bottom;
        const spaceLeft = triggerRect.left;
        const spaceRight = viewportWidth - triggerRect.right;

        let bestPosition: "top" | "bottom" | "left" | "right" = "bottom";
        let bestStyle = {};

        const positions = [
            { pos: "bottom" as const, fits: spaceBottom >= popoverRect.height + offset, space: spaceBottom },
            { pos: "top" as const, fits: spaceTop >= popoverRect.height + offset, space: spaceTop },
            { pos: "right" as const, fits: spaceRight >= popoverRect.width + offset, space: spaceRight },
            { pos: "left" as const, fits: spaceLeft >= popoverRect.width + offset, space: spaceLeft },
        ];

        const fittingPosition = positions.find(p => p.fits);
        const selectedPosition = fittingPosition || positions.reduce((prev, curr) => 
            curr.space > prev.space ? curr : prev
        );
        
        bestPosition = selectedPosition.pos;

        switch (bestPosition) {
            case "bottom":
                bestStyle = {
                    top: triggerRect.bottom + offset,
                    left: triggerRect.left + triggerRect.width / 2,
                    transform: "translateX(-50%)",
                };
                break;
            case "top":
                bestStyle = {
                    bottom: viewportHeight - triggerRect.top + offset,
                    left: triggerRect.left + triggerRect.width / 2,
                    transform: "translateX(-50%)",
                };
                break;
            case "right":
                bestStyle = {
                    left: triggerRect.right + offset,
                    top: triggerRect.top + triggerRect.height / 2,
                    transform: "translateY(-50%)",
                };
                break;
            case "left":
                bestStyle = {
                    right: viewportWidth - triggerRect.left + offset,
                    top: triggerRect.top + triggerRect.height / 2,
                    transform: "translateY(-50%)",
                };
                break;
        }

        setPosition(bestPosition);
        setPopoverStyle(bestStyle);
    }, [offset]);

    // Закрытие при скролле
    useEffect(() => {
        if (!isOpen || !closeOnScroll) return;

        let scrollTimeout: NodeJS.Timeout;
        
        const handleScroll = () => {
            // Сразу закрываем поповер при скролле
            handleClose();
        };

        // Слушаем скролл на всех возможных элементах
        window.addEventListener("scroll", handleScroll, true);
        document.addEventListener("scroll", handleScroll, true);
        
        // Также слушаем скролл на всех скроллящихся элементах
        const allElements = document.querySelectorAll("*");
        const scrollableElements: Element[] = [];
        
        allElements.forEach((el) => {
            const hasScroll = window.getComputedStyle(el).overflowY === "scroll" ||
                            window.getComputedStyle(el).overflowY === "auto";
            if (hasScroll) {
                scrollableElements.push(el);
                el.addEventListener("scroll", handleScroll);
            }
        });

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            document.removeEventListener("scroll", handleScroll, true);
            scrollableElements.forEach(el => {
                el.removeEventListener("scroll", handleScroll);
            });
        };
    }, [isOpen, closeOnScroll, handleClose]);

    // Закрытие при клике вне
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node) &&
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        };

        calculatePosition();
        
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleClose); // закрываем при ресайзе

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleClose);
        };
    }, [isOpen, calculatePosition, handleClose]);

    // Закрытие по Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, handleClose]);

    return (
        <>
            <div ref={triggerRef} className={styles.popoverContainer} />

            {isOpen && createPortal(
                <div
                    ref={popoverRef}
                    className={`${styles.popover} ${styles[position]}`}
                    style={popoverStyle}
                >
                    <div className={`${styles.arrow} ${styles[position]}`} />
                    <div className={`${styles.content} ${className}`}>{children}</div>
                </div>,
                document.body
            )}
        </>
    );
};