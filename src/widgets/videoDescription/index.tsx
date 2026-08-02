import React from "react";
import { cookies } from "next/headers";

import { IChannel } from "@/entities/channels/modal/types";
import { EllipsisText, Popover, Svg, Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import { formatDate } from "@/shared/utils/formatDate";
import { SubscribeButton } from "@/features";
import { EvaluateVideo } from "@/features/videoDescription/evaluateVideo/ui";
import { ShareVideo } from "@/features/videoDescription/shareVideo/ui";
import { SettingsVideo } from "@/features/videoDescription/settingsVideo/ui";
import { IChannelData } from "@/shared/utils/getChannelData";

import styles from "./styles.module.scss";

interface IVideoDescription {
  videoId: string;
  name: string;
  viewersCount: number;
  channel: IChannel;
  datePublication: string;
  videoDescription: string;
  hashtags: string[];
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  dislikeCount: number;
  subscribersCount: number;
  isSubscribed: boolean;
  notificationSettings: boolean;
  videoHash: string;
  myChannelData: IChannelData | null
}

export const VideoDescription: React.FC<IVideoDescription> = async ({
  videoId,
  name,
  viewersCount,
  channel,
  datePublication,
  videoDescription,
  hashtags,
  likeCount,
  dislikeCount,
  isLiked,
  isDisliked,
  subscribersCount,
  isSubscribed,
  notificationSettings,
  videoHash,
  myChannelData
}) => {

  return (
    <div className={styles.description}>
      <div className={styles.channel}>
        <a href={`/channel/${channel.username}`}>
          <img
            src={channel.avatar_url ?? "/defaultImages/defaultAvatar.png"}
            alt="avatarUrl"
            className={styles.channel_img}
          />
        </a>

        <div className={styles.channelInfo}>
          <a
            href={`/channel/${channel.username}`}
            className={styles.channelInfo_name}
          >
            {channel.name}
          </a>
          <Text size={12} weight={400}>
            {formatViews(channel.subscribers_count)} подписчиков
          </Text>
        </div>
        <SubscribeButton
          isSubscribed={isSubscribed}
          notificationSetting={notificationSettings}
          meId={myChannelData?.id || ''}
          channelId={channel.id}
          videoHash={videoHash}
          videoId={videoId}
        />
      </div>

      <div className={styles.rating}>
        <EvaluateVideo
          isLiked={isLiked}
          isDisliked={isDisliked}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          userId={myChannelData?.id || ''}
          videoId={videoId}
        />

        <ShareVideo videoHash={videoHash} />

        <div className={styles.rating_settings}>
          <SettingsVideo videoHash={videoHash} />
        </div>
      </div>

      <div className={styles.videoDescription}>
        <div className={styles.videoDescription_info}>
          <Text className={styles.videoDescription_info_days}>
            {viewersCount} просмотров
          </Text>
          <Text className={styles.videoDescription_info_days}>
            {formatDate(datePublication)}
          </Text>
          {hashtags && (
            <div className={styles.hashTags}>
              {hashtags?.map((hashtag: string, index: number) => {
                return (
                  <Text key={index} color="var(--gray)">
                    {hashtag}
                  </Text>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.videoDescription_text}>
          <EllipsisText text={videoDescription} symbolCount={210} />
        </div>
      </div>
    </div>
  );
};
