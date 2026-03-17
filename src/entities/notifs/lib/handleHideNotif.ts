import { useToast } from "@/app/providers/toastProvider"

interface IHandleHideNotif {
    id: string
    openToast: (text: string) => void
}

export const handleHideNotif = ({id, openToast}: IHandleHideNotif) => {
    openToast(`уведомление скрыто: ${id}`)
}