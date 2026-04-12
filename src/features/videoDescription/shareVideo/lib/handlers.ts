
export const handleCopyVideoURL = async (videoHash: string, openToast: (text: string) => void) => {
    navigator.clipboard.writeText(videoHash)
    openToast('ссылка на видео скопирована')
}