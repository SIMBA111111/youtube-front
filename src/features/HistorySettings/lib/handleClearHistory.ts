import { Dispatch, SetStateAction } from "react";
import { modalType } from "../ui";
import { deleteViewersHistory } from "@/shared/api/me/deleteViewersHistory";

export const handleClearHistory = async (setOpenedModal: Dispatch<SetStateAction<modalType>>, meId: string, openToast: (text: string) => void) => {
    
    const res = await deleteViewersHistory(meId)
    
    if(res.success) {
        openToast('История очищена')
    }

    setOpenedModal(null)
}