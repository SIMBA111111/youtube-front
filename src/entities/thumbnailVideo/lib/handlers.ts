import { Dispatch, SetStateAction } from "react";
import { IVideo } from "../modal/types";

export const handleMenuClick = (e: React.MouseEvent, setIsOpenModal: Dispatch<SetStateAction<boolean>>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpenModal(true)
    console.log('Open menu for video');
};

export const handleViewLater = (e: React.MouseEvent, video: IVideo, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('смотреть позже');
};

export const handleShareVideo = (e: React.MouseEvent, video: IVideo, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('поделиться');
};

export const handleHideVideo = (e: React.MouseEvent, video: IVideo, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('не интересно');
};

export const handleHideChannel = (e: React.MouseEvent, video: IVideo, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('скрыть видео с канала');
};

export const handleReport = (e: React.MouseEvent, video: IVideo, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('пожаловаться');
};

