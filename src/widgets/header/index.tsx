'use client'

import { BurgerButton, Svg } from '@/shared/ui'
import { CreateContentBtn, LoginBtn, Notifications, UnauthoredSettingsBtn, UserBtn, VideoSearch } from '@/features'
import Cookies from 'js-cookie'

import styles from './styles.module.scss'

    // TO DO тетсовые данные, потом из кук брать их
    const activeLanguage = 'ru'

export const Header = () => {
    const theme = Cookies.get('theme')
    const jwt = Cookies.get('jwt')
    const parsedChannelData = Cookies.get('channelData') ? JSON.parse(Cookies.get('channelData') || '') : null

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
                jwt && parsedChannelData ? (
                    <>
                        <CreateContentBtn/>
                        <Notifications/>
                        <UserBtn
                            id={parsedChannelData.id}
                            activeLanguage={activeLanguage} 
                            username={parsedChannelData.username} 
                            channelName={parsedChannelData.name} 
                            avatarUrl={parsedChannelData.avatarUrl} 
                            activeTheme={theme as string}
                        />
                    </>
                ) : (
                    <>
                        <UnauthoredSettingsBtn/>
                        <LoginBtn />
                    </>
                )
            }   
            </div>
        </div>
    )
}