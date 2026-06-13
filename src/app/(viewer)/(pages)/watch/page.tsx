import { cookies } from "next/headers";

import { Player } from "@webitch/player";
import { getVideoByHash } from "@/shared/api/video/getVideoByHash";
import { RecommentedVideos, VideoDescription } from "@/widgets";
import { Text, VideoThumbnailSkeleton } from "@/shared/ui";
import { Comments } from "@/widgets/Comments";
import { getRecommentedVideos } from "@/shared/api/video/getRecommentedVideos";
import { updateViewVideo } from "@/shared/api/video/updateViewVideo";

import { IChannel } from "@/entities/channels/modal/types";
import { IVideo } from "@/entities/thumbnailVideo/modal/types";

import styles from "./styles.module.scss";

interface IVideoPage {
  video?: IVideo;
  channel?: IChannel;
  stat?: {};
  isSubscribed?: {};
}

export default async function WatchVideo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params  = await searchParams;
  const videoHash = Object.values(params)[0]

  const cookie = await cookies();
  const channelData = cookie.get("channelData")?.value || "";
  let myChannelData;
  if (channelData) {
    myChannelData = JSON.parse(channelData);
  } else {
    myChannelData = {};
  }

  const videoData = await getVideoByHash(videoHash, myChannelData?.id);

  const recommentedVideos = await getRecommentedVideos(
    videoHash,
    0,
    20,
    myChannelData?.id
  );

  const res = await updateViewVideo({
    videoId: videoData.video?.id,
    userId: myChannelData?.id,
  });
  const isSubscribed = videoData?.isSubscribed
    ? "id" in videoData.isSubscribed
    : false;

  console.log('videoData.video = ', videoData);

  return (
    <div className={styles.page}>
      <div className={styles.video}>
        <div className={styles.player}>
          <Player
            playlistUrl={videoData.video?.masterM3u8Url}
            duration={videoData.video?.duration}
            fragments={videoData.video?.fragments}
          />
        </div>
        <div className={styles.description}>
          <Text weight={600} size={18}>
            {videoData.name}
          </Text>
          <VideoDescription
            videoId={videoData?.video?.id}
            channel={videoData?.channel}
            dislikeCount={videoData.video?.dislikeCount}
            likeCount={videoData.video?.likeCount}
            name={videoData.video?.name}
            viewersCount={videoData.video?.viewersCount}
            datePublication={videoData.video?.datePublication}
            subscribersCount={videoData.channel?.subscribersCount}
            isSubscribed={isSubscribed}
            isLiked={videoData.stat?.liked}
            isDisliked={videoData.stat?.disliked}
            notificationSettings={
              videoData.isSubscribed?.notification_settings || false
            }
            videoDescription={videoData.video?.videoDescription || ""}
            hashtags={videoData.video?.hashtags || ""}
            videoHash={videoHash}
          />
        </div>
        <div className={styles.comments}>
          <Comments
            me={myChannelData}
            videoHash={videoHash}
            videoId={videoData.video?.id}
          />
        </div>
      </div>
      <div className={styles.recommendations}>
        <RecommentedVideos
          initVideos={recommentedVideos.videos}
          videoHash={videoHash}
          myChannelId={channelData?.id}
        />
      </div>
    </div>
  );
}
