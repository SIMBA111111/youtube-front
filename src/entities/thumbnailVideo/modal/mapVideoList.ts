import { IVideo } from "./types";

export const mapVideoList = (videoList: any[] = []): IVideo[] => {
    return videoList?.map((v: any) => {
        return {
            id: v.id,
            name: v.name,
            videoHash: v.video_hash,
            duration: v.duration,
            previewUrl: v.thumbnail_url,
            videoPreviewUrl: v.video_preview_url,
            viewersCount : v.viewerscount,
            channel: v.channel,
            datePublication: v.date_publication,
            tags: v.tags,
            isShort: v.isshort,
        }
    })
}