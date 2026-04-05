import { Player } from '@webitch/player'
import { getVideoByHash } from '@/shared/api/video/getVideoByHash';
import { VideoDescription } from '@/widgets';
import { Text } from '@/shared/ui';
import { getCommentsByVideoHash } from '@/shared/api/comments/getCommentsByVideoHash';
import { Comments } from '@/widgets/Comments';
import styles from "./styles.module.scss";


export default async function WatchVideo ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
    
    const { v: videoHash } = await searchParams

    const videoData = await getVideoByHash(videoHash)
    const videoComments = await getCommentsByVideoHash(videoHash)

    return (
        <div className={styles.page}>
            <div className={styles.video}>
                <div className={styles.player}>
                    <Player playlistUrl='/videos/long-video/longVideo.m3u8' duration={30} />
                </div>
                <div className={styles.description}>
                    <Text weight={600} size={18}>{videoData.name}</Text>
                    <VideoDescription
                        id={videoData.id} 
                        channel={videoData.channel} 
                        dislikeCount={videoData.dislikeCount} 
                        likeCount={videoData.likeCount} 
                        name={videoData.name}
                        viewersCount={videoData.viewersCount} 
                        datePublication={videoData.datePublication}
                        subscribersCount={videoData.subscribersCount}
                        isSubscribed={videoData.isSubscribed}
                        videoDescription={videoData.videoDescription}
                        hashtags={videoData.hashtags}
                    />
                </div>
                <div className={styles.comments}>
                    <Comments videoComments={videoComments}/>
                </div>
            </div>
            <div className={styles.recommendations}>
                рекомандации
            </div>
        </div>
    )
}