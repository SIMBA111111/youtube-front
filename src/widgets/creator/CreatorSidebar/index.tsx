import { FC } from 'react'

import { Svg, Text } from '@/shared/ui'
import { CREATOR_SIDEBAR } from '@/shared/constants/sidebar'
import { svgs } from '@/shared/constants/svgs'

import styles from './styles.module.scss'

interface ICreatorSidebar {
    channelAvatar: string
    channelName: string
}

export const CreatorSidebar: FC<ICreatorSidebar> = ({
    channelAvatar,
    channelName
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
                        <div className={styles.route} key={el.id}>
                            <Svg name={el.svgName as keyof typeof svgs}/>
                            <Text>{el.name}</Text>
                        </div>
                    )
                }
            </div>        
        </div>
    )
}