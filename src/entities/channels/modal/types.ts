import { notificationSettings } from "@/features/videoDescription/sibscribe/ui"

export interface IChannel {
    id: string
    name: string
    avatarUrl: string
    subscribersCount: number
    notificationSetting: notificationSettings
}