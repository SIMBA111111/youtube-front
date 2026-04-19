import { IChannel } from "@/entities/channels/modal/types"
import { ITag } from "@/entities/videoTags/ui"

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
    tags?: ITag[]
    isShort: boolean
}

export interface IVideoViewed extends IVideo {
    dateViewed: string
}