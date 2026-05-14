"use client"

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import clsx from "clsx"

import { Svg } from "../Svg"
import { Text } from "../Text"

import styles from './styles.module.scss'

interface IModal {
    children: ReactNode
    title?: React.ReactNode
    isCloseButton?: boolean
    isOverlay?: boolean
    isVisible: boolean
    setIsVisible: (e: boolean) => void
    className?: string
}

export const Modal: React.FC<IModal> = ({
    children, 
    title, 
    isCloseButton = true, 
    isOverlay = false,
    isVisible, 
    setIsVisible, 
    className
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);

    // Монтируем портал только на клиенте
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Обработчик клика вне модалки
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                const openModals = document.querySelectorAll(`.${styles.modalContainer}.${styles.modalContainer__visible}`);
                
                if (openModals.length > 1) {
                    const currentModalIndex = Array.from(openModals).findIndex(
                        modal => modal === modalRef.current
                    );
                    
                    if (currentModalIndex < openModals.length - 1) {
                        return;
                    }
                }
                
                setIsVisible(false);
            }
        };

        // Блокируем скролл body при открытой модалке
        if (isVisible) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 0);
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, setIsVisible]);

    // Останавливаем всплытие кликов внутри модалки
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const classList = clsx(
        className, 
        styles.modalContainer, 
        styles[`modalContainer__${isVisible ? 'visible' : 'hidden'}`]
    );

    // Если модалка не видна или еще не смонтирована на клиенте - не рендерим
    if (!isVisible || !mounted) return null;

    // Контент модалки
    const modalContent = (
        <>
            <div className={classList} ref={modalRef} onClick={handleModalClick}>
                {(isCloseButton || title) && (
                    <div className={styles.header}>
                        {title && (
                            <Text color="var(--blackText)" size={28}>{title}</Text>
                        )}
                        {isCloseButton && (
                            <div className={styles.closeBtn} onClick={() => setIsVisible(false)}>
                                <Svg name="cross" size="middle" color="black"/>
                            </div>
                        )}
                    </div>
                )}
                
                {children}
            </div>
            {isOverlay && (
                <div 
                    className={clsx(
                        styles.overlay, 
                        isVisible && styles.overlay__visible
                    )} 
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const openModals = document.querySelectorAll(`.${styles.modalContainer}.${styles.modalContainer__visible}`);
                        if (openModals.length <= 1) {
                            setIsVisible(false);
                        }
                    }}
                />
            )}
        </>
    );

    // Рендерим в портал (обычно в body, но можно в любой DOM-элемент)
    const portalRoot = typeof document !== 'undefined' ? document.body : null;
    
    return portalRoot ? createPortal(modalContent, portalRoot) : null;
}