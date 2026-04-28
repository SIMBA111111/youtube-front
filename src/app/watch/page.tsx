import { cookies } from 'next/headers';

import { Player } from '@webitch/player'
import { getVideoByHash } from '@/shared/api/video/getVideoByHash';
import { RecommentedVideos, VideoDescription } from '@/widgets';
import { Text, VideoThumbnailSkeleton } from '@/shared/ui';
import { getCommentsByVideoHash } from '@/shared/api/comments/getCommentsByVideoHash';
import { Comments } from '@/widgets/Comments';
import { getRecommentedVideos } from '@/shared/api/video/getRecommentedVideos';

import styles from "./styles.module.scss";
import { updateViewVideo } from '@/shared/api/video/updateViewVideo';


export default async function WatchVideo ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
    const { v: videoHash } = await searchParams
    const cookie = await cookies()
    const channelData = JSON.parse(cookie.get('channelData')?.value || '')

    const videoData = await getVideoByHash(videoHash, channelData?.id)
    const videoComments = await getCommentsByVideoHash(videoHash, 0, 20)
    const recommentedVideos = await getRecommentedVideos(videoHash, 0, 20, channelData?.id)

    const res = await updateViewVideo({videoId: videoData.video.id, userId: channelData?.id})

    return (
        <div className={styles.page}>
            <div className={styles.video}>
                <div className={styles.player}>
                    <Player playlistUrl='/videos/long-video/longVideo.m3u8' duration={30} />
                </div>
                <div className={styles.description}>
                    <Text weight={600} size={18}>{videoData.name}</Text>
                    <VideoDescription
                        videoId={videoData.video.id} 
                        channel={videoData.channel} 
                        dislikeCount={videoData.video.dislikes_count} 
                        likeCount={videoData.video.likes_count} 
                        name={videoData.video.name}
                        viewersCount={videoData.video.viewers_count} 
                        datePublication={videoData.video.date_publication}
                        subscribersCount={videoData.channel.subscribers_count}
                        isSubscribed={videoData.isSubscribed ? true : false}
                        isLiked={videoData.stat?.liked}
                        isDisliked={videoData.stat?.disliked}
                        notificationSettings={videoData.isSubscribed?.notification_settings || false}
                        videoDescription={videoData.video.description || ''}
                        hashtags={videoData.video.videoDescription || ''}
                        videoHash={videoHash}
                    />
                </div>
                <div className={styles.comments}>
                    <Comments initComments={videoComments.comments} videoHash={videoHash}/>
                </div>
            </div>
            <div className={styles.recommendations}>
                <RecommentedVideos initVideos={recommentedVideos.videos} videoHash={videoHash} myChannelId={channelData?.id}/>
            </div>
        </div>
    )
}