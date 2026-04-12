import { Svg, Text } from "@/shared/ui"
import { formatViews } from "@/shared/utils/formatViews"
import styles from './styles.module.scss'

interface IEvaluateVideo {
    isLiked: string,
    isDisliked: string,
    likeCount: number
    dislikeCount: number
}

export const EvaluateVideo: React.FC<IEvaluateVideo> = ({
    isLiked = true, 
    isDisliked = true,
    likeCount,
    dislikeCount
}) => {
    return (
        <div className={styles.rating_likeDislike}>
            <div className={styles.rating_like}>
                <Svg name={isLiked ? 'filledLike' : 'like'} color="black"/>
                <Text weight={400}>{formatViews(likeCount)}</Text>
            </div>
            <div className={styles.rating_divider}></div>
            <div className={styles.rating_dislike}>
                <Svg name={isDisliked ? 'filledDislike' : 'dislike'} color="black"/>
                <Text weight={400}>{formatViews(dislikeCount)}</Text>
            </div>
        </div>
    )
}