import { deleteNotif } from "@/shared/api/notifications/deleteNotif"

interface IHandleHideNotif {
    id: string
    openToast: (text: string) => void
    handleDeleteNotif: (notifId: string) => void
}

export const handleHideNotif = async ({id, openToast, handleDeleteNotif}: IHandleHideNotif) => {
    const res = await deleteNotif(id)

    if (!res.success || res.error) {
        return
    }

    handleDeleteNotif(id)

    openToast(`уведомление скрыто: ${id}`)
}