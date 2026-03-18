'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Svg, Text } from '@/shared/ui'

import styles from './styles.module.scss'
import { IChannel } from '@/entities/channels/modal/types'
import { SIDEBAR_NAVIGATION, SIDEBAR_YOU } from '@/shared/constants/sidebar'


export const Sidebar = ({channels}: {channels: IChannel[]}) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
    const sidebarContainerRef = useRef<HTMLDivElement>(null)
    const [channelsState, setChannelsState] = useState<IChannel[]>(channels)
    const pathname = usePathname()
    const isTablet = false

    console.log('isOpenSidebar = ', isOpenSidebar);


    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         event.stopPropagation()
    //         event.preventDefault()
    //         if (sidebarContainerRef.current && !sidebarContainerRef.current.contains(event.target as Node)) {
    //             setIsOpenSidebar(false);
    //         }
    //     };

    //     if (isOpenSidebar) {
    //         // Добавляем небольшой таймаут, чтобы событие не сработало сразу при открытии
    //         setTimeout(() => {
    //             document.addEventListener('mousedown', handleClickOutside);
    //         }, 0);
    //     }

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [isOpenSidebar, setIsOpenSidebar]);
    

    return (
        <>
            {!isOpenSidebar &&
                <>
                    <div className={styles.sidebarContainerHidden}>
                        <div className={styles.sidebarBtn__close} onClick={() => setIsOpenSidebar(true)}><Svg name='burger'/></div>
                        <div className={styles.btns}>
                            <Link href={'/'} className={styles.btns__item}>
                                {pathname === '/' ? <Svg name='homeActive' /> : <Svg name='home' /> }
                                <Text weight={400}>Главная</Text>
                            </Link>

                            <Link href={'/shorts'} className={styles.btns__item}>
                                {pathname === '/shorts' ? <Svg name='shortsActive' /> : <Svg name='shorts' /> }
                                <Text weight={400}>Shorts</Text>
                            </Link>

                            <Link href={'/subscriptions'} className={styles.btns__item}>
                                {pathname === '/subscriptions' ? <Svg name='subscriptionsActvie' /> : <Svg name='subscriptions' /> }
                                <Text weight={400}>Подписки</Text>
                            </Link>

                            <Link href={'/myAccount'} className={styles.btns__item}>
                                {pathname === '/myAccount' ? <Svg name='myAccountActive' /> : <Svg name='myAccount' /> }
                                <Text weight={400}>Вы</Text>
                            </Link>
                        </div>
                    </div>
                </>
            }

            {isOpenSidebar &&
                <>
                    <div className={styles.sidebarContainer} ref={sidebarContainerRef}>
                        <div className={styles.sidebarBtns}>
                            <div className={styles.sidebarBtn}><Svg name='burger'/></div>
                            <div className={styles.logo}><Svg name='mainLogo'/></div>
                        </div>
                        <div className={styles.btns__open}>
                            <Link href={'/'} className={styles.btns__item__open}>
                                {pathname === '/' ? <Svg name='homeActive' /> : <Svg name='home' /> }
                                <Text weight={400}>Главная</Text>
                            </Link>

                            <Link href={'/shorts'} className={styles.btns__item__open}>
                                {pathname === '/shorts' ? <Svg name='shortsActive' /> : <Svg name='shorts' /> }
                                <Text weight={400}>Shorts</Text>
                            </Link>

                            <Link href={'/'} className={styles.btns__item__open}>
                                <Text>Подписки</Text>
                                <Svg name='arrowLeft' />
                            </Link>
                            {channels.map((channel: IChannel) => (
                                <Link href={`/channel/${channel.username}`} className={styles.btns__item__open}>
                                    <img src={channel.avatarUrl} alt="" className={styles.channelAvatar}/>
                                    <Text>{channel.name}</Text>
                                </Link>
                            ))}


                            <Link href={'/'} className={styles.btns__item__open}>
                                <Text>Вы</Text>
                                <Svg name='arrowLeft' />
                            </Link>
                            
                            {SIDEBAR_YOU.map((el: any) => (
                                <Link key={el.id} href={el.href} className={styles.btns__item__open}>
                                    <Svg name={el.svgName} />
                                    <Text>{el.name}</Text>
                                </Link>
                            ))}


                            <Link href={'/'} className={styles.btns__item__open}>
                                <Text>Навигатор</Text>
                            </Link>

                            {SIDEBAR_NAVIGATION.map((el: any) => (
                                <Link key={el.id} href={el.href} className={styles.btns__item__open}>
                                    <Svg name={el.svgName} />
                                    <Text>{el.name}</Text>
                                </Link>
                            ))}
                            
                        </div>
                    </div>
                    {isTablet && <div className={styles.sidebarOverlay}/>}
                </>
            }
        </>
    )
}