import { IVideo } from "../modal/types";

export const handleMenuClick = (e: React.MouseEvent, video: IVideo) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Open menu for video:', video.videoHash);
};