import { Dispatch, SetStateAction } from "react";
import { modalType } from "../ui";
import { deleteViewersHistory } from "@/shared/api/me/deleteViewersHistory";

export const handleClearHistory = async (
    setOpenedModal: Dispatch<SetStateAction<modalType>>, 
    meId: string, 
    openToast: (text: string) => void,
    onHistoryCleared?: () => void
) => {
    
    const res = await deleteViewersHistory(meId)
    
    if(res.success) {
        onHistoryCleared?.()
        openToast('История очищена')
    }

    setOpenedModal(null)
}