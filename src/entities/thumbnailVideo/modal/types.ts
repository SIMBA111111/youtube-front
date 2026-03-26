import { IChannel } from "@/entities/channels/modal/types"

export interface IVideo {
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
}