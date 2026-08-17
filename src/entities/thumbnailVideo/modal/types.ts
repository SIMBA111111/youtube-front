import { IChannel } from "@/entities/channels/modal/types"
import { ITag } from "@/entities/videoTags/ui"
import { VideoAccessId } from "@/shared/constants/radioButtons"

export interface IVideo {
    id: string
    name: string
    duration: number
    previewUrl: string
    videoPreviewUrl: string
    videoMp4Url: string
    viewersCount: number
    likeCount: number
    dislikeCount: number
    commentsCount?: number
    videoAccess: VideoAccessId
    averageColor: string
    masterM3u8Url: string
    channel: IChannel
    datePublication?: string
    tags?: ITag[]
    isShort: boolean
}

export interface IVideoViewed extends IVideo {
    dateViewed: string
}