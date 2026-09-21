export interface IVideoStatisticEntity {
    id: string;
    viewsCount: number;
    liked: boolean;
    disliked: boolean;
    channelId: string;
    videoId: string;
    createdDate: string;
    updatedDate: string;
}