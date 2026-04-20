import { Dispatch, SetStateAction } from "react";
import { modalType } from "../ui";

export const handleClearHistory = (setOpenedModal: Dispatch<SetStateAction<modalType>>) => {
    setOpenedModal(null)
}