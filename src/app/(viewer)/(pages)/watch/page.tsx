import { cookies } from "next/headers";

import {Player} from "@webitch/player";
import { RecommentedVideos, VideoDescription } from "@/widgets";
import { Text } from "@/shared/ui";
import { Comments } from "@/widgets/Comments";
import { updateViewVideo } from "@/shared/api/video/updateViewVideo";
import { IChannelEntity } from "@/entities/channels/model/types";
import { IVideoEntity, IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { getChannelData } from "@/shared/utils/getChannelData";
import { getVideoById } from "@/shared/api/video/getVideoById";
import { ISubscriptionEntity } from "@/shared/types/subscriptionEntity";
import { IVideoStatisticEntity } from "@/shared/types/videoStatisticEntity";
import { IFragmentEntity } from "@/shared/types/fragmentEntity";
import { mapVideoFragments } from "@/shared/maps/mapVideoFragments";
import styles from "./styles.module.scss";
import { ERRORS } from "@/shared/constants/apiErrors";
import { notFound } from "next/navigation";


interface IVideoPage {
    video: IVideoEntity
    channel: IChannelEntity,
    videoFragments: IFragmentEntity[],
    subscriptionData: ISubscriptionEntity | null,
    videoStatData: IVideoStatisticEntity | null,
}

export default async function WatchVideo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params  = await searchParams;
  const videoId = Object.values(params)[0]

  const cookie = await cookies();
  const myChannelData = await getChannelData(cookie)

  if (!videoId) {
    return (
      <div>
        404...
      </div>
    )
  }
  
  const videoData = await getVideoById(videoId, myChannelData?.id);
  const res = await updateViewVideo({
    videoId: videoId,
    userId: myChannelData && myChannelData.isSaveHistory ? myChannelData?.id : '',
  });

  // тут пример практически идеального кода для ручки как на беке так и на фронте
  // максимум что еще изменить - добавить чуть больше типов ошибок и обрабатывать поступающие параметры на беке, чтобы 4xx ответы слать
  if (videoData.error === ERRORS.NOT_FOUND) {
    notFound()
  }

  if (!videoData || !videoData.data || videoData.error || !videoData.success) {
    throw new Error('Video error') 
  }
  
  const fragments = mapVideoFragments(videoData.data.videoFragments || [])

  return (
    <div className={styles.page} key={videoId}>
      <div className={styles.video}>
        <div className={styles.player}>
          <Player
            playlistUrl={videoData.data.video?.masterM3u8Url}
            duration={videoData.data.video?.duration}
            fragments={fragments}
            thumbnailUrl={videoData.data.video.thumbnailUrl}
          />
        </div>
        <div className={styles.description}>
          <Text weight={600} size={18}>
            {videoData.data.video?.name || ''}
          </Text>
          <VideoDescription
            videoId={videoData.data.video?.id}
            channel={videoData.data.channel}
            dislikeCount={videoData.data.video?.dislikesCount}
            likeCount={videoData.data.video?.likesCount}
            name={videoData.data.video?.name}
            viewersCount={videoData.data.video?.viewersCount}
            datePublication={videoData.data.video?.datePublication}
            subscribersCount={videoData.data.channel?.subscribersCount || 0}
            isSubscribed={!!videoData.data.subscriptionData}
            isLiked={videoData.data.videoStatData?.liked || false}
            isDisliked={videoData.data.videoStatData?.disliked || false}
            notificationSettings={
              videoData.data.subscriptionData?.notificationSettings || false
            }
            videoDescription={videoData.data.video?.description || ""}
            hashtags={videoData.data.video?.hashtags || []}
            myChannelData={myChannelData}
          />
        </div>
        <div className={styles.comments}>
          <Comments
            me={myChannelData}
            videoId={videoData.data.video?.id}
            commentCount={videoData.data.video?.commentsCount || 0}
          />
        </div>
      </div>
      <div className={styles.recommendations}>
        <RecommentedVideos
          videoId={videoId}
          myChannelId={myChannelData?.id}
        />
      </div>
    </div>
  );
}
