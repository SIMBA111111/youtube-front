
export const handleCopyVideoURL = async (videoHash: string, openToast: (text: string) => void) => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_FRONTEND_URL + "/watch?v=" + videoHash)
    openToast('ссылка на видео скопирована')
}