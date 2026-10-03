import { Svg, Text } from "@/shared/ui"
import { CommentsModal } from "@/shared/ui/Modal/Modals/CommetsModal"
import { FC, useState } from "react"
import { formatViews } from "@/shared/utils/formatViews"
import { IChannelData } from "@/shared/utils/getChannelData"
import styles from './styles.module.scss'


interface ICommentsVideo {
    videoId: string
    commentsCount: number
    me: IChannelData | null
}

export const CommentsVideo: FC<ICommentsVideo> = ({
    commentsCount,
    me,
    videoId
}) => {
    const [isOpenedCommentModal, setIsOpenedCommentsModal] = useState<boolean>(false)
    
    return (
        <>
            <button className={styles.shortVideoBtnsContainer_item} onClick={() => setIsOpenedCommentsModal(true)}>
                <div className={styles.shortVideoBtnsContainer_item_svg}>
                    <Svg name='comments' color='black'/>
                </div>
                <Text className={styles.shortVideoBtnsContainer_item_text}>{formatViews(commentsCount)}</Text>
            </button>

            <CommentsModal 
                isOpened={isOpenedCommentModal} 
                onClose={() => setIsOpenedCommentsModal(false)}
                me={me}    
                videoId={videoId}
                commentsCount={commentsCount}
            />
        </>
    )
}