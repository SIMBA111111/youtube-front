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


export const DesktopSidebar = ({channels, randomShortVideo}: {channels: IChannel[], randomShortVideo: IThumbnailShortVideo}) => {
    // const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)
    const [isOpenedSubsPopover, setIsOpenedSubsPopover] = useState<boolean>(false)
    const [isOpenedYouPopover, setIsOpenedYouPopover] = useState<boolean>(false)
    const pathname = usePathname()

    const {isOpen, openSideBar, closeSideBar} = useSidebarStore()

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

                            <Link href={'/subscriptions'} className={styles.btns__item} onMouseEnter={() => setIsOpenedSubsPopover(true)}>
                                {pathname === '/subscriptions' ? <Svg name='subscriptionsActvie' /> : <Svg name='subscriptions' /> }
                                <Text weight={400} size={12}>Подписки</Text>
                            </Link>
                            <Menu isOpen={isOpenedSubsPopover} onClose={() => setIsOpenedSubsPopover(false)}>
                                {channels.map((channel: IChannel) => (
                                    <Link key={channel.id} href={`/channel/${channel.username}`} className={styles.btns__item__open}>
                                        <img src={channel.avatarUrl} alt="" className={styles.channelAvatar}/>
                                        <Text weight={400} size={14}>{channel.name}</Text>
                                    </Link>
                                ))}
                            </Menu>

                            <Link href={'/you'} className={styles.btns__item}>
                                {pathname === '/you' ? <Svg name='myAccountActive' /> : <Svg name='myAccount' /> }
                                <Text weight={400} size={12}>Вы</Text>
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