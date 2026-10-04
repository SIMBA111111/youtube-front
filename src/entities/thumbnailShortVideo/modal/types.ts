import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types"

export interface IThumbnailShortVideo {
    video: IVideoFullInfo
    isRow?: boolean
}

export interface IShortVideoListItem {
    id: string
    thumbnail_url: string
}

