'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Svg, Text } from '@/shared/ui'

import { IChannel } from '@/entities/channels/modal/types'
import { SIDEBAR_NAVIGATION, SIDEBAR_YOU } from '@/shared/constants/sidebar'
import { useSidebarStore } from '@/shared/store/sidebar'

import styles from './styles.module.scss'



export const TabletSidebar = ({channels}: {channels: IChannel[]}) => {
    const sidebarContainerRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    const {isOpen, openSideBar, closeSideBar} = useSidebarStore()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            event.stopPropagation()
            event.preventDefault()
            if (sidebarContainerRef.current && !sidebarContainerRef.current.contains(event.target as Node)) {
                closeSideBar();
            }
        };

        if (isOpen) {
            // Добавляем небольшой таймаут, чтобы событие не сработало сразу при открытии
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 0);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    

    return (
        <>
                <div className={`${styles.sidebarContainer} ${isOpen ? styles.open : ''}`} ref={sidebarContainerRef}>
                    <div className={styles.sidebarBtns}>
                        <div className={styles.sidebarBtn} onClick={() => closeSideBar()}><Svg name='burger'/></div>
                        <div className={styles.logo}><Svg name='mainLogo'/></div>
                    </div>
                    <div className={styles.btns__open}>
                        <div className={styles.divider}>
                            <Link href={'/'} onClick={(() => closeSideBar())} className={pathname === '/' ? styles.btns__item__open_active : styles.btns__item__open}>
                                {pathname === '/' ? <Svg name='homeActive' /> : <Svg name='home' /> }
                                <Text weight={400} size={14}>Главная</Text>
                            </Link>

                            <Link href={'/shorts'} onClick={(() => closeSideBar())} className={pathname === '/shorts' ? styles.btns__item__open_active : styles.btns__item__open}>
                                {pathname === '/shorts' ? <Svg name='shortsActive' /> : <Svg name='shorts' /> }
                                <Text weight={400} size={14}>Shorts</Text>
                            </Link>
                        </div>
                        
                        <div className={styles.divider}>
                            <Link href={'/'} className={styles.btns__item__open}>
                                <Text>Подписки</Text>
                                <Svg name='arrowLeft' size='small'/>
                            </Link>
                            {channels.map((channel: IChannel) => (
                                <Link key={channel.id} onClick={(() => closeSideBar())} href={`/channel/${channel.username}`} className={styles.btns__item__open}>
                                    <img src={channel.avatarUrl} alt="" className={styles.channelAvatar}/>
                                    <Text weight={400} size={14}>{channel.name}</Text>
                                </Link>
                            ))}
                        </div>

                        <div className={styles.divider}>
                            <Link href={'/'} className={styles.btns__item__open}>
                                <Text>Вы</Text>
                                <Svg name='arrowLeft' size='small'/>
                            </Link>
                            
                            {SIDEBAR_YOU.map((el: any) => (
                                <Link key={el.id} href={el.href} onClick={(() => closeSideBar())} className={styles.btns__item__open}>
                                    <Svg name={el.svgName} />
                                    <Text weight={400} size={14}>{el.name}</Text>
                                </Link>
                            ))}
                        </div>

                        <div className={styles.divider}>
                            <div className={`${styles.navigator} ${styles.btns__item__open}`}>
                                <Text>Навигатор</Text>
                            </div>

                            {SIDEBAR_NAVIGATION.map((el: any) => (
                                <Link key={el.id} href={el.href} onClick={(() => closeSideBar())} className={styles.btns__item__open}>
                                    <Svg name={el.svgName} />
                                    <Text weight={400} size={14}>{el.name}</Text>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {isOpen && <div className={styles.sidebarOverlay}/>}
        </>
    )
}