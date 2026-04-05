'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { IElement } from '../Searcher';

import styles from './styles.module.scss';
import { Svg } from '../Svg';

interface ISelectorDropDown {
    elements: Array<IElement> | null;
    setSelectedElement: Dispatch<SetStateAction<IElement>>;
    selectedElement: IElement;
    isVisible: boolean;
    setIsVisible: (el: boolean) => void;
}

export const DropDown: React.FC<ISelectorDropDown> = ({
    elements,
    setSelectedElement,
    selectedElement,
    isVisible,
    setIsVisible,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            event.stopPropagation()
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    const handleSelectedElement = (el: IElement) => {
        setSelectedElement(el);
        setIsVisible(false);
    };

    if (!elements) {
        return null;
    }

    return (
        <div
            ref={dropdownRef}
            className={`${styles.dropdownContainer} ${styles.dropdown} ${
                isVisible && elements.length > 0
                    ? styles.visibleDropdown
                    : styles.unvisibleDropdown
            }`}
        >
            {elements.length === 0 && (
                <div className={styles.noResults}>Ничего не найдено</div>
            )}
            {elements?.map((el: IElement, index) => (
                <div
                    key={index}
                    onClick={() => handleSelectedElement(el)}
                    className={`${styles.dropdownElement} ${selectedElement.id === el.id ? styles.selectedElement : ''}`}
                >
                    {el.value}
                </div>
            ))}
        </div>
    );
};