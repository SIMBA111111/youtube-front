"use client"

import React, { ReactNode, useEffect, useRef, useState } from "react"
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
    id?: string
}

let modalStack: string[] = [];

const addToStack = (id: string) => {
    modalStack = [...modalStack.filter(modalId => modalId !== id), id];
};

const removeFromStack = (id: string) => {
    modalStack = modalStack.filter(modalId => modalId !== id);
};

const isTopModal = (id: string) => {
    return modalStack[modalStack.length - 1] === id;
};

export const Modal: React.FC<IModal> = ({
    children, 
    title, 
    isCloseButton = true, 
    isOverlay = false,
    isVisible, 
    setIsVisible, 
    className,
    id = Math.random().toString(36).substring(7)
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const modalId = useRef(id);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isVisible) {
            addToStack(modalId.current);
        } else {
            removeFromStack(modalId.current);
        }
        return () => {
            removeFromStack(modalId.current);
        };
    }, [isVisible]);

    useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
    const isClickOnModal = modalRef.current?.contains(event.target as Node);
    const isClickOnOverlay = (event.target as HTMLElement).classList?.contains(styles.overlay);
    
    if (!isClickOnModal && !isClickOnOverlay && isTopModal(modalId.current)) {
        setIsVisible(false);
    }
};
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isTopModal(modalId.current)) {
                setIsVisible(false);
            }
        };

        if (isVisible && isTopModal(modalId.current)) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            if (isTopModal(modalId.current)) {
                const otherOpenModals = modalStack.filter(id => id !== modalId.current);
                if (otherOpenModals.length === 0) {
                    document.body.style.overflow = '';
                }
            }
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isVisible, setIsVisible]);

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isTopModal(modalId.current)) {
            setIsVisible(false);
        }
    };

    const classList = clsx(
        className, 
        styles.modalContainer, 
        styles[`modalContainer__${isVisible ? 'visible' : 'hidden'}`],
        {
            [styles.modalTop]: isTopModal(modalId.current),
            [styles.modalBottom]: !isTopModal(modalId.current)
        }
    );

    if (!isVisible || !mounted) return null;

    const modalContent = (
        <>
            <div 
                className={classList} 
                ref={modalRef} 
                onClick={handleModalClick}
                style={{ 
                    zIndex: 1000 + modalStack.indexOf(modalId.current),
                    position: 'fixed'
                }}
                onMouseDown={(e) => {
                    e.stopPropagation(); // 🟢 Добавьте и это
                }}
            >
                {(isCloseButton || title) && (
                    <div className={styles.header}>
                        {title && (
                            <Text color="var(--blackText)" size={28}>{title}</Text>
                        )}
                        &#8203;
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
                    onClick={handleOverlayClick}
                    style={{ 
                        zIndex: 999 + modalStack.indexOf(modalId.current),
                        position: 'fixed'
                    }}
                />
            )}
        </>
    );

    const portalRoot = typeof document !== 'undefined' ? document.body : null;
    return portalRoot ? createPortal(modalContent, portalRoot) : null;
};