'use client'

import { BurgerButton, Svg } from '@/shared/ui'
import { CreateContentBtn, LoginBtn, Notifications, UserBtn, VideoSearch } from '@/features'
import Cookies from 'js-cookie'

import styles from './styles.module.scss'


    // TO DO тетсовые данные, потом из кук брать их
    const username = '@SWEET_LIFE'
    const channelName = 'СЛАДКАЯ ЖИЗНЬ'
    const avatarUrl = '/testImages/testChannelAvatar.png'
    const activeLanguage = 'ru'


export const Header = () => {
    const theme = Cookies.get('theme')
    const jwt = Cookies.get('jwt')



    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContainer__block}>
                <BurgerButton/>
                <div className={styles.logo}><Svg name='mainLogo'/></div>
            </div>
            <div className={styles.headerContainer__block}>
                <div className={styles.searcher}>
                    <VideoSearch/>
                </div>
            </div>
            <div className={styles.headerContainer__block}>
            {
                jwt ? (
                    <>
                        <CreateContentBtn/>
                        <Notifications/>
                        <UserBtn id='aspdjasjd' activeLanguage={activeLanguage} username={username} channelName={channelName} avatarUrl={avatarUrl} activeTheme={'light'}/>
                    </>
                ) : (
                    <LoginBtn />
                )
            }   
            </div>
        </div>
    )
}