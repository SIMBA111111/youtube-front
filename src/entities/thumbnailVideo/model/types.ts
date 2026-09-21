import { IChannel } from "@/entities/channels/model/types"
import { ITagEntity } from "@/entities/videoTags/model"
import { VideoAccessId } from "@/shared/constants/radioButtons"

export enum VIDEO_ACCESS {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

export type TVideoAccess = keyof typeof VIDEO_ACCESS

export interface IVideoEntity {
  id: string;
  name: string;
  videoHash: string;
  duration: number;
  thumbnailUrl: string;
  videoPreviewUrl: string;
  masterM3u8Url: string;
  videoMp4Url: string;
  description: string;
  channelId: string;
  viewersCount: number;
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  videoAccess: TVideoAccess;
  averageColor: string;
  isShort: boolean;
  tags: string[];
  hashtags: string[];
  playlistIds: string[];
  datePublication: string;
  updatedDate: string;
  createdDate: string;
}

export interface IShortChannel {
    channelId: string
    channelUsername: string
    channelName: string
    channelAvatarUrl: string
}

// это получается главный интерфейс
export interface IVideoFullInfo {
    video: IVideoEntity
    channel: IShortChannel
}

export interface IVideoViewed extends IVideoEntity {
    dateViewed: string
}
