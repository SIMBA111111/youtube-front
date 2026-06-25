
export const handleCopyVideoURL = async (videoHash: string, openToast: (text: string) => void, isShorts: boolean = false) => {
    const urlPrefix = isShorts ? '/shorts/' : "/watch?v="
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_FRONTEND_URL + urlPrefix + videoHash)
    openToast('ссылка на видео скопирована')
}