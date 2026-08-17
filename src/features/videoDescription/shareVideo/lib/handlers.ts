
export const handleCopyVideoURL = async (videoId: string, openToast: (text: string) => void, isShorts: boolean = false) => {
    const urlPrefix = isShorts ? '/shorts/' : "/watch?v="
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_FRONTEND_URL + urlPrefix + videoId)
    openToast('ссылка на видео скопирована')
}