'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { IElement } from '..';

import styles from './styles.module.scss';
import { Svg } from '../../Svg';

interface ISelectorDropDown {
    elements: Array<IElement> | null;
    setSelectedElement: any;
    isVisible: boolean;
    isActive: boolean;
    setIsVisible: (el: boolean) => void;
    setValue: any;
}

export const SearcherDropDown: React.FC<ISelectorDropDown> = ({
    elements,
    setSelectedElement,
    isVisible,
    isActive,
    setIsVisible,
    setValue,
}) => {
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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
        setValue(el.value);
        setSelectedElement(el);
        setIsVisible(false);
        router.push(`/services/${el.id}`);
    };

    if (!elements) {
        return null;
    }

    return (
        <div
            ref={dropdownRef}
            className={`${styles.dropdownContainer} ${styles.dropdown} ${
                isVisible && isActive && elements.length > 0
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
                    className={styles.dropdownElement}
                >
                    <Svg name='magnifier' size='small'/>
                    <span className={styles.dropdownElement_text}>{el.value}</span>
                </div>
            ))}
        </div>
    );
};