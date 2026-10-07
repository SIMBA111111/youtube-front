import { VideoAccessId } from "../constants/radioButtons";

export const getVideoAccess = (videoAccess: VideoAccessId) => {
    return videoAccess === 'PRIVATE' ? 'По ссылке' : 'Для всех'
}