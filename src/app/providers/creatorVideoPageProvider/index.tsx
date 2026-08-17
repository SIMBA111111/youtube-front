import { FC, ReactNode } from "react"
import { CreatorVideoSidebar } from "@/widgets/creator"
import { CreatorHeader } from "@/widgets/creator/CreatorHeader"
import styles from './styles.module.scss'

interface ICreatorPageProvider {
    children: ReactNode
    videoPrevieww: string
    videoName: string
    videoId: string
    channelUsername: string
    activeLanguage: string
    activeTheme: string
    channelName: string
    channelId: string
    channelAvatar: string
}

export const CreatorVideoPageProvider: FC<ICreatorPageProvider> = ({ 
    children, 
    videoPrevieww, 
    videoName,
    videoId,
    channelUsername,
    activeTheme,
    activeLanguage,
    channelName, 
    channelId,
    channelAvatar
}) => {
    return (
        <div className={`${styles.grid} ${styles.gridSidebarOpen}`} id="page-wrapper">
            <div className={styles.sidebarWrapper}>
                <CreatorVideoSidebar videoPrevieww={videoPrevieww} videoName={videoName} videoId={videoId}/>
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