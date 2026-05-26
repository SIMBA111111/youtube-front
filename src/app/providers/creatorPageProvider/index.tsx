import { FC, ReactNode } from "react"
import { CreatorSidebar } from "@/widgets/creator"
import styles from './styles.module.scss'
import { CreatorHeader } from "@/widgets/creator/CreatorHeader"

interface ICreatorPageProvider {
    children: ReactNode
    channelAvatar: string
    channelName: string
    channelId: string
    channelUsername: string
    activeLanguage: string
    activeTheme: string
}

export const CreatorPageProvider: FC<ICreatorPageProvider> = ({ 
    children, 
    channelAvatar, 
    channelName,
    channelId,
    channelUsername,
    activeTheme,
    activeLanguage,
}) => {
    return (
        <div className={`${styles.grid} ${styles.gridSidebarOpen}`} id="page-wrapper">
            <div className={styles.sidebarWrapper}>
                <CreatorSidebar channelAvatar={channelAvatar} channelName={channelName} channelId={channelId}/>
            </div>
            
            <div className={styles.headerWrapper}>
                <CreatorHeader 
                    activeLanguage={activeLanguage}
                    activeTheme={activeTheme}
                    channelAvatar={channelAvatar}
                    channelId={channelId}
                    channelName={channelName}
                    channelUsername={channelUsername}
                />
            </div>
            
            <div className={styles.pageWrapper_opened}>
                {children}
            </div>
        </div>
    )
}