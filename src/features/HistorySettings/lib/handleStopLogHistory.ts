import { Dispatch, SetStateAction } from "react";
import type { modalType } from "../ui";
import { updateSaveHistory } from "@/shared/api/me/updateSaveHistory";

export const handleStopLogHistory = async (setOpenedModal: Dispatch<SetStateAction<modalType>>, meId: string, isSaveHistory: boolean, setHistoryIsSave: Dispatch<SetStateAction<boolean>>) => {
    
    const res = await updateSaveHistory(meId, isSaveHistory)

    setHistoryIsSave(res.data.isSaveHistory)

    setOpenedModal(null)
}