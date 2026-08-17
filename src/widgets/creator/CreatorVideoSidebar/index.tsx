import { FC } from 'react'

import { Text } from '@/shared/ui'
import { CREATOR_VIDEO_SIDEBAR } from '@/shared/constants/sidebar'
import { svgs } from '@/shared/constants/svgs'
import { NavigationItem } from '@/entities/creator'

import styles from './styles.module.scss'

interface ICreatorVideoSidebar {
    videoPrevieww: string
    videoName: string
    videoId: string
}

export const CreatorVideoSidebar: FC<ICreatorVideoSidebar> = async ({
    videoId,
}) => {
    return (
        <div className={styles.sidebar}>
            {/* <div className={styles.channel}>
                <img src={videoPrevieww} alt="channelAvatar" className={styles.channel_img}/>
                <Text weight={500}>Ваш канал</Text>
                <Text color='var(--descriptionText)'>{videoName}</Text>
            </div> */}

            <div className={styles.routes}>
                {
                    CREATOR_VIDEO_SIDEBAR.map(el => 
                        <NavigationItem href={el.href(videoId)} name={el.name} svgName={el.svgName as keyof typeof svgs} key={el.id}/>
                    )
                }
            </div>        
        </div>
    )
}