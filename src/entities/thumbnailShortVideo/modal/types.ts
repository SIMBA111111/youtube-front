import { IChannel } from "@/entities/channels/modal/types"

export interface IThumbnailShortVideo {
    id: string
    name: string
    duration: number
    previewUrl: string
    videoPreviewUrl: string
    viewersCount: number
    channel: IChannel
    datePublication?: string
    isShort: boolean
    isRow?: boolean
}

export interface IShortVideoListItem {
    id: string
    thumbnail_url: string
}

