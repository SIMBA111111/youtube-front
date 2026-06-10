import { VideoAccessId } from "../constants/radioButtons";

export const getVideoAccess = (videoAccess: VideoAccessId) => {
    return videoAccess === 'byLink' ? 'По ссылке' : 'Для всех'
}