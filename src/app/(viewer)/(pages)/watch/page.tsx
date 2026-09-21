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


interface IVideoPage {
    video: IVideoEntity
    videoOwnerChannel: IChannelEntity,
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
    userId: myChannelData?.id || '',
  });

  if (!videoData) {
    return (
      <div>
        ...Ошибка
      </div>
    )
  }

  const fragments = mapVideoFragments(videoData?.videoFragments || [])

  return (
    <div className={styles.page} key={videoId}>
      <div className={styles.video}>
        <div className={styles.player}>
          <Player
            playlistUrl={videoData.video?.masterM3u8Url}
            duration={videoData.video?.duration}
            fragments={fragments}
          />
        </div>
        <div className={styles.description}>
          <Text weight={600} size={18}>
            {videoData.video?.name || ''}
          </Text>
          <VideoDescription
            videoId={videoData.video?.id}
            channel={videoData.videoOwnerChannel}
            dislikeCount={videoData.video?.dislikesCount}
            likeCount={videoData.video?.likesCount}
            name={videoData.video?.name}
            viewersCount={videoData.video?.viewersCount}
            datePublication={videoData.video?.datePublication}
            subscribersCount={videoData.videoOwnerChannel?.subscribersCount || 0}
            isSubscribed={!!videoData.subscriptionData}
            isLiked={videoData.videoStatData?.liked || false}
            isDisliked={videoData.videoStatData?.disliked || false}
            notificationSettings={
              videoData.subscriptionData?.notificationSettings || false
            }
            videoDescription={videoData.video?.description || ""}
            hashtags={videoData.video?.hashtags || []}
            myChannelData={myChannelData}
          />
        </div>
        <div className={styles.comments}>
          <Comments
            me={myChannelData}
            videoId={videoData.video?.id}
            commentCount={videoData.video?.commentsCount || 0}
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
