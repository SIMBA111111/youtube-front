import { notificationSettings } from "@/features/videoDescription/sibscribe/ui"

export interface ILink {
    id: string
    name: string
    url: string
    linkAvatar: string
}

export interface IChannelEntity {
    id: string;
    name: string;
    username: string;
    password: string;
    email: string;
    avatarUrl: string | null;
    bannerUrl: string | null;
    description: string | null;
    subscribersCount: number;
    videosCount: number;
    viewersCount: number;
    country: string | null;
    createdAt: string;
    links: string[] | null;
    notificationSetting: string[] | null;
}