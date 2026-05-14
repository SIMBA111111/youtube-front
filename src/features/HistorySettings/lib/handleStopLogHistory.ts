import { Dispatch, SetStateAction } from "react";
import type { modalType } from "../ui";
import { updateSaveHistory } from "@/shared/api/me/updateSaveHistory";

export const handleStopLogHistory = async (setOpenedModal: Dispatch<SetStateAction<modalType>>, meId: string, isSaveHistory: boolean, setHistoryIsSave: Dispatch<SetStateAction<boolean>>) => {
    
    const res = await updateSaveHistory(meId, isSaveHistory)

    console.log('resresresres = ', res);
    setHistoryIsSave(res.updatedChannel.is_save_history)

    setOpenedModal(null)
}