export interface IChannelItem {
    id: string
    name: string
    avatarUrl: string
}

interface IVideoItem {
    id: string
    previewUrl: string
    videoHash: string
    isShort: boolean
}

export interface INotificationItem {
    id: string
    channel: IChannelItem
    createdAt: string
    video: IVideoItem
    isViewed: boolean
}

export interface INotifCard {
    notif: INotificationItem
}