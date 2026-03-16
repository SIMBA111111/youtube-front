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
    clasName?: string
}

export const Modal: React.FC<IModal> = ({children, isCloseButton=true, isOverlay=true,isVisible, setIsVisible, clasName}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, setIsVisible]);

    const classList = clsx(clasName, styles.modalContainer, styles[`modalContainer__${isVisible? 'visible' : 'hidden'}`])
    
    return (
        <>
            <div className={classList} ref={modalRef}>
                <div className={styles.modal}>
                    {children}
                </div>
                {isCloseButton && <div className={styles.closeBtn} onClick={() => setIsVisible(false)}><Svg name="cross" size="middle"/></div>}
            </div>
            {isOverlay && <div className={isVisible ? styles.overlay : ''}></div>}
        </>
    )
}