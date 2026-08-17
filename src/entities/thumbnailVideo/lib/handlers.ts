import { Dispatch, SetStateAction } from "react";

export const handleMenuClick = (e: React.MouseEvent, setIsOpenModal: Dispatch<SetStateAction<boolean>>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpenModal(true)
};

export const handleViewLater = (e: React.MouseEvent, video: string, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('смотреть позже');
};

export const handleShareVideo = async (e: React.MouseEvent, videoId: string, userId: string, openToast: (text: string) => void) => {
    e.preventDefault();
    e.stopPropagation();
    const videoLink = window.location.origin + '/watch?=' + videoId
    await navigator.clipboard.writeText(videoLink)
    openToast('Ссылка на видео скопирована в буфер обмена')
};

export const handleHideVideo = (e: React.MouseEvent, video: string, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('не интересно');
};

export const handleHideChannel = (e: React.MouseEvent, video: string, userId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('скрыть видео с канала');
};

export const handleReport = (e: React.MouseEvent, setIsOpenedReportModal: (newValue: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpenedReportModal(true)
    console.log('пожаловаться');
};

