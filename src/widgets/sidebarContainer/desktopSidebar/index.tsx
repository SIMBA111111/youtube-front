'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { Popover, Svg, Text } from '@/shared/ui'
import { IChannel } from '@/entities/channels/modal/types'
import { SIDEBAR_NAVIGATION, SIDEBAR_YOU } from '@/shared/constants/sidebar'
import { useSidebarStore } from '@/shared/store/sidebar'
import { IThumbnailShortVideo } from '@/entities/thumbnailShortVideo/modal/types'
import { Menu } from '@/shared/ui/Menu'

import styles from './styles.module.scss'

type menuItems = 'subs' | 'you' | null

export const DesktopSidebar = ({channels, randomShortVideo}: {channels: IChannel[], randomShortVideo: IThumbnailShortVideo}) => {
    const [isOpenedMenu, setIsOpenedMenu] = useState<menuItems>(null)
    const pathname = usePathname()
    const timeoutRef = useRef<NodeJS.Timeout>(null)

    const {isOpen} = useSidebarStore()

    const handleMouseEnter = (menuItem: menuItems) => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        setIsOpenedMenu(menuItem)
    }

    const handleMouseLeave = (menuItem: menuItems) => {
        timeoutRef.current = setTimeout(() => {
            setIsOpenedMenu(null)
        }, 1000)
    }

    return (
        <>
            {!isOpen &&
                <>
                    <div className={styles.sidebarContainerHidden}>
                        <div className={styles.btns}>
                            <Link href={'/'} className={styles.btns__item}>
                                {pathname === '/' ? <Svg name='homeActive'/> : <Svg name='home' /> }
                                <Text weight={400} size={12}>Главная</Text>
                            </Link>

                            <Link href={`/shorts/${randomShortVideo?.videoHash}`} className={styles.btns__item}>
                                {pathname === '/shorts' ? <Svg name='shortsActive' /> : <Svg name='shorts' /> }
                                <Text weight={400} size={12}>Shorts</Text>
                            </Link>

                            <Link 
                                href={'/subscriptions'} 
                                className={styles.btns__item} 
                                onMouseEnter={() => handleMouseEnter('subs')}
                                onMouseLeave={() => handleMouseLeave('subs')}
                            >
                                {pathname === '/subscriptions' ? <Svg name='subscriptionsActvie' /> : <Svg name='subscriptions' /> }
                                <Text weight={400} size={12}>Подписки</Text>
                                <Menu isOpened={isOpenedMenu === 'subs'} onClose={() => setIsOpenedMenu(null)} offset={50}>
                                    {channels.map((channel: IChannel) => (
                                        <Link key={channel.id} href={`/channel/${channel.username}`} className={styles.btns__item__open}>
                                            <img src={channel.avatarUrl} alt="" className={styles.channelAvatar}/>
                                            <Text weight={400} size={14}>{channel.name}</Text>
                                        </Link>
                                    ))}
                                </Menu>
                            </Link>

                            <Link 
                                href={'/you'} 
                                className={styles.btns__item}
                                onMouseEnter={() => handleMouseEnter('you')}
                                onMouseLeave={() => handleMouseLeave('you')}
                            >
                                {pathname === '/you' ? <Svg name='myAccountActive' /> : <Svg name='myAccount' /> }
                                <Text weight={400} size={12}>Вы</Text>
                                <Menu 
                                    isOpened={isOpenedMenu === 'you'}
                                    onClose={() => setIsOpenedMenu(null)} 
                                    offset={50}
                                    className={styles.youMenu_container}
                                >
                                    <Text size={18} weight={600} className={styles.youMenu_header}>Вы</Text>
                                    <div className={styles.youMenu}>
                                        <Link href={'/feed/history'} className={styles.youMenu_item}>
                                            <Svg name='history' />
                                            <Text>История</Text>
                                        </Link>
                                        <Link href={'/feed/playlists'} className={styles.youMenu_item}>
                                            <Svg name='playlist' />
                                            <Text>Плейлисты</Text>
                                        </Link>
                                        <Link href={'/feed/see-later'} className={styles.youMenu_item}>
                                            <Svg name='clock' />
                                            <Text>Смотреть позже</Text>
                                        </Link>
                                        <Link href={'/feed/liked'} className={styles.youMenu_item}>
                                            <Svg name='like' />
                                            <Text>Понравившиеся</Text>
                                        </Link>
                                        <Link href={'/feed/my-videos'} className={styles.youMenu_item}>
                                            <Svg name='video' />
                                            <Text>Ваши видео</Text>
                                        </Link>
                                        <Link href={'/feed/dowloaded'} className={styles.youMenu_item}>
                                            <Svg name='download' />
                                            <Text>Скачанное</Text>
                                        </Link>
                                    </div>
                                </Menu>
                            </Link>
                        </div>
                    </div>
                </>
            }

            {isOpen &&
                <>
                    <div className={styles.sidebarContainer}>
                        <div className={styles.btns__open}>
                            <div className={styles.divider}>
                                <Link href={'/'} className={pathname === '/' ? styles.btns__item__open_active : styles.btns__item__open}>
                                    {pathname === '/' ? <Svg name='homeActive' /> : <Svg name='home' /> }
                                    <Text weight={400} size={14}>Главная</Text>
                                </Link>

                                <Link href={`/shorts/${randomShortVideo?.videoHash}`} className={pathname === '/shorts' ? styles.btns__item__open_active : styles.btns__item__open}>
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
                                    <Link key={channel.id} href={`/channel/${channel.username}`} className={styles.btns__item__open}>
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
                                    <Link key={el.id} href={el.href} className={styles.btns__item__open}>
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
                                    <Link key={el.id} href={el.href} className={styles.btns__item__open}>
                                        <Svg name={el.svgName} />
                                        <Text weight={400} size={14}>{el.name}</Text>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}