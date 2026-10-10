import { useToast } from "@/app/providers/toastProvider"
import { updateNotifView } from "@/shared/api/notifications/updateNotifView"

interface IHandleHideNotif {
    id: string
    openToast: (text: string) => void
}

export const handleHideNotif = async ({id, openToast}: IHandleHideNotif) => {
    console.log('handleHideNotif');
    
    const res = await updateNotifView(id)

    openToast(`уведомление скрыто: ${id}`)
}