import { IVideoFullInfo } from "@/entities/thumbnailVideo/model/types";
import { IGetVideoById } from "../api/video/getVideoById";

export const mapIGetVideoToIVideoFullInfo = (video: IGetVideoById): IVideoFullInfo => {
    return {
        video: {
            ...video.video
        },
        channel: {
            channelAvatarUrl: video.channel.avatarUrl || '',
            channelId: video.channel.id || '',
            channelName: video.channel.name || '',
            channelUsername: video.channel.username || '',
        },
    }
}