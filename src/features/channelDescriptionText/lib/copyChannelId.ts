export const copyChannelId = (channelID: string, openToast: (text: string) => void) => {
    navigator.clipboard.writeText(channelID)
        .then(() => openToast('Идентификатор канала скопирован в буфер обмена'))
}