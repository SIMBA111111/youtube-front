import { FC } from 'react'

import { Text } from '@/shared/ui'
import { CREATOR_SIDEBAR } from '@/shared/constants/sidebar'
import { svgs } from '@/shared/constants/svgs'
import { NavigationItem } from '@/entities/creator'

import styles from './styles.module.scss'

interface ICreatorSidebar {
    channelAvatar: string
    channelName: string
    channelId: string
}

export const CreatorSidebar: FC<ICreatorSidebar> = async ({
    channelAvatar,
    channelName,
    channelId,
}) => {

    return (
        <div className={styles.sidebar}>
            <div className={styles.channel}>
                <img src={channelAvatar} alt="channelAvatar" className={styles.channel_img}/>
                <Text weight={500}>Ваш канал</Text>
                <Text color='var(--descriptionText)'>{channelName}</Text>
            </div>

            <div className={styles.routes}>
                {
                    CREATOR_SIDEBAR.map(el => 
                        <NavigationItem href={el.href(channelId)} name={el.name} svgName={el.svgName as keyof typeof svgs} key={el.id}/>
                    )
                }
            </div>        
        </div>
    )
}