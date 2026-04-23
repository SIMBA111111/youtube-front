'use client';

import { Svg } from '@/shared/ui';
import { useSidebarStore } from '@/shared/store/sidebar';
import { MouseEvent } from 'react';

export const BurgerButton = () => {
    const {isOpen, toggleSideBar} = useSidebarStore()
    console.log('isOpen: ', isOpen);
    
    // BurgerButton
    const handleToggleSideBar = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        const currentState = useSidebarStore.getState().isOpen;
        console.log('Текущее состояние из getState():', currentState);
        
        if (currentState) {
            useSidebarStore.getState().closeSideBar();
        } else {
            useSidebarStore.getState().openSideBar();
        }
    }
    return (
        <div onClick={(e: MouseEvent) => handleToggleSideBar(e)} style={{ cursor: 'pointer' }}>
            <Svg name='burger' />
        </div>
    );
};