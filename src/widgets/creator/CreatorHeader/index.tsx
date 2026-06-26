import { FC } from 'react'

import { BurgerButton, Svg, Text } from '@/shared/ui'
import { CREATOR_SIDEBAR } from '@/shared/constants/sidebar'
import { svgs } from '@/shared/constants/svgs'

import styles from './styles.module.scss'
import { MainLogoBtn } from '@/features/mainLogoBtn/ui'
import { CreateContentBtn, UserBtn } from '@/features'

interface ICreatorHeader {
    channelId: string
    channelAvatar: string
    channelName: string
    channelUsername: string
    activeLanguage: string
    activeTheme: string
}

export const CreatorHeader: FC<ICreatorHeader> = ({
    channelId,
    channelAvatar,
    channelName,
    channelUsername,
    activeLanguage,
    activeTheme
}) => {
    return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContainer__block}>
        <BurgerButton />
        {/* <MainLogoBtn/> */}
      </div>
      <div className={styles.headerContainer__block}>
        <div className={styles.searcher}>
          {/* <VideoSearch /> */}
        </div>
      </div>
      <div className={styles.headerContainer__block}>
        <CreateContentBtn channelId={channelId}/>
        <UserBtn
            id={channelId}
            activeLanguage={activeLanguage}
            username={channelUsername}
            channelName={channelName}
            avatarUrl={channelAvatar}
            activeTheme={activeTheme}
        />
      </div>
    </div>
    )
}