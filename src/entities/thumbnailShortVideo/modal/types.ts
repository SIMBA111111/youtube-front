import { IChannel } from "@/entities/channels/modal/types"

export interface IThumbnailShortVideo {
    id: string
    name: string
    videoHash: string
    duration: number
    previewUrl: string
    videoPreviewUrl: string
    viewersCount: number
    channel: IChannel
    datePublication?: string
    isShort: boolean
    isRow?: boolean
}