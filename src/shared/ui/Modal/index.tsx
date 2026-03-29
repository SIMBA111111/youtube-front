"use client"

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
import clsx from "clsx"

import { Svg } from "../Svg"

import styles from './styles.module.scss'


interface IModal {
    children: ReactNode
    isCloseButton?: boolean
    isOverlay?: boolean
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    className?: string
}

export const Modal: React.FC<IModal> = ({children, isCloseButton=true, isOverlay=false,isVisible, setIsVisible, className}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                // Проверяем, есть ли другие открытые модалки
                const openModals = document.querySelectorAll(`.${styles.modalContainer}.${styles.modalContainer__visible}`);
                
                // Если это не последняя открытая модалка, не закрываем
                if (openModals.length > 1) {
                    const currentModalIndex = Array.from(openModals).findIndex(
                        modal => modal === modalRef.current
                    );
                    
                    // Если это не верхняя модалка (не последняя в DOM), не закрываем
                    if (currentModalIndex < openModals.length - 1) {
                        return;
                    }
                }
                
                setIsVisible(false);
            }
        };

        if (isVisible) {
            // Добавляем небольшой таймаут, чтобы событие не сработало сразу при открытии
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 0);
        }

        return () => {
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
        styles[`modalContainer__${isVisible? 'visible' : 'hidden'}`]
    )
    
    return (
        <>
            <div className={classList} ref={modalRef} onClick={handleModalClick}>
                {isCloseButton && (
                    <div className={styles.closeBtn} onClick={() => setIsVisible(false)}>
                        <Svg name="cross" size="middle"/>
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
                        e.stopPropagation()
                        e.preventDefault();
                        const openModals = document.querySelectorAll(`.${styles.modalContainer}.${styles.modalContainer__visible}`);
                        if (openModals.length <= 1) {
                            setIsVisible(false);
                        }
                    }}
                />
            )}
        </>
    )
}