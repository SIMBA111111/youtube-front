import { useToast } from "@/app/providers/toastProvider"
import { IChannelItem } from "../modal/types"

interface IHandleOffNotifByChannel {
    id: string
    channel: IChannelItem
    openToast: (text: string) => void
}

export const handleOffNotifByChannel = ({id, channel, openToast}: IHandleOffNotifByChannel) => {
    openToast(`Уведомления от канала ${channel.name} скрыты`)
}