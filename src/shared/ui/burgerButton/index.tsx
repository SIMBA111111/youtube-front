'use client';

import { Svg } from '@/shared/ui';
import { useSidebarStore } from '@/shared/store/sidebar';

export const BurgerButton = () => {
    const {toggleSideBar} = useSidebarStore()


    return (
        <div onClick={toggleSideBar} style={{ cursor: 'pointer' }}>
            <Svg name='burger' />
        </div>
    );
};