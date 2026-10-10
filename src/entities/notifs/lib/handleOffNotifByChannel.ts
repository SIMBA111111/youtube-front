interface IHandleOffNotifByChannel {
    id: string
    channel: string
    openToast: (text: string) => void
}

export const handleOffNotifByChannel = ({id, channel, openToast}: IHandleOffNotifByChannel) => {
    openToast(`Уведомления от канала ${channel} скрыты`)
}