export interface ICommentEntity {
  id: string;
  text: string;
  likeCount: number;
  dislikeCount: number;
  videoId: string;
  channelId: string;
  parentCommentId: string | null;
  repliesCount: number
  createdDate: Date;
  updatedDate: Date;
}

export interface ICommentFullInfo {
  id: string;
  text: string;
  likeCount: number;
  dislikeCount: number;
  videoId: string;
  channelId: string;
  parentCommentId: string | null;
  repliesCount: number
  createdDate: string;
  updatedDate: string;
  channel: ICommentChannelDto;
  userLiked: boolean | null;
  userDisliked: boolean | null;
  userStatId: string | null;
}

interface ICommentChannelDto {
  id: string;
  name: string;
  avatarUrl: string | null;
}