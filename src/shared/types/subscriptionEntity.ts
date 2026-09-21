export interface ISubscriptionEntity {
    id: string;
    channelId: string;
    followerChannelId: string;
    notificationSettings: boolean;
    createdDate: string;
    updatedDate: string;
    deleted: boolean;
}