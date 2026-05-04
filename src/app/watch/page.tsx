import { cookies } from 'next/headers';

import { Player } from '@webitch/player'
import { getVideoByHash } from '@/shared/api/video/getVideoByHash';
import { RecommentedVideos, VideoDescription } from '@/widgets';
import { Text, VideoThumbnailSkeleton } from '@/shared/ui';
import { getCommentsByVideoHash } from '@/shared/api/comments/getCommentsByVideoHash';
import { Comments } from '@/widgets/Comments';
import { getRecommentedVideos } from '@/shared/api/video/getRecommentedVideos';
import { updateViewVideo } from '@/shared/api/video/updateViewVideo';

import styles from "./styles.module.scss";
import { IChannel } from '@/entities/channels/modal/types';
import { IVideo } from '@/entities/thumbnailVideo/modal/types';


interface IVideoPage {
    video?: IVideo
    channel?: IChannel
    stat?: {

    },
    isSubscribed?: {
        
    }
}


export default async function WatchVideo ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
    const { v: videoHash } = await searchParams
    const cookie = await cookies()
    const channelData = JSON.parse(cookie.get('channelData')?.value || '')

    let videoData: IVideoPage = {}

    const handleGetVideoData = async () => {
        videoData = await getVideoByHash(videoHash, channelData?.id)
    }

    await handleGetVideoData()

    const videoComments = await getCommentsByVideoHash(videoHash, 0, 20)
    const recommentedVideos = await getRecommentedVideos(videoHash, 0, 20, channelData?.id)

    const res = await updateViewVideo({videoId: videoData.video?.id, userId: channelData?.id})

    console.log('videoData =-=-=-=-=-=-=-=-== ', videoData);
    

    return (
        <div className={styles.page}>
            <div className={styles.video}>
                <div className={styles.player}>
                    <Player playlistUrl={videoData.video?.masterM3u8Url} duration={30} />
                </div>
                <div className={styles.description}>
                    <Text weight={600} size={18}>{videoData.name}</Text>
                    <VideoDescription
                        videoId={videoData?.video?.id} 
                        channel={videoData?.channel} 
                        dislikeCount={videoData.video?.dislikeCount} 
                        likeCount={videoData.video?.likeCount} 
                        name={videoData.video?.name}
                        viewersCount={videoData.video?.viewersCount} 
                        datePublication={videoData.video?.datePublication}
                        subscribersCount={videoData.channel?.subscribersCount}
                        isSubscribed={videoData.isSubscribed ? true : false}
                        isLiked={videoData.stat?.isLiked}
                        isDisliked={videoData.stat?.isDisliked}
                        notificationSettings={videoData.isSubscribed?.notification_settings || false}
                        videoDescription={videoData.video?.description || ''}
                        hashtags={videoData.video?.videoDescription || ''}
                        videoHash={videoHash}
                    />
                </div>
                <div className={styles.comments}>
                    <Comments initComments={videoComments.comments} me={channelData} videoHash={videoHash} videoId={videoData.video?.id}/>
                </div>
            </div>
            <div className={styles.recommendations}>
                <RecommentedVideos initVideos={recommentedVideos.videos} videoHash={videoHash} myChannelId={channelData?.id}/>
            </div>
        </div>
    )
}