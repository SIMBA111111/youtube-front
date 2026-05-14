'use client';

import { Svg } from '@/shared/ui';
import { useSidebarStore } from '@/shared/store/sidebar';
import { MouseEvent } from 'react';

export const BurgerButton = () => {
    const {isOpen, toggleSideBar} = useSidebarStore()
    
    const handleToggleSideBar = (e: MouseEvent) => {
        const currentState = useSidebarStore.getState().isOpen;
        
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