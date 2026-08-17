
export const handleCopyVideoURL = async (videoId: string, openToast: (text: string) => void) => {
    navigator.clipboard.writeText(videoId)
    openToast('ссылка на видео скопирована')
}