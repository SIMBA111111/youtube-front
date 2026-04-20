import { Dispatch, SetStateAction } from "react";
import type { modalType } from "../ui";

export const handleStopLogHistory = (setOpenedModal: Dispatch<SetStateAction<modalType>>) => {
    setOpenedModal(null)
}