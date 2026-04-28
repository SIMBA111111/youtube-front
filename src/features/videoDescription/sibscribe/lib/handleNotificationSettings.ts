import { handleNotifSetting } from "@/shared/api/channels/handleNotifSetting";
import { Dispatch, SetStateAction } from "react";

export const handleNotificationSettings = async (
    channelId: string, 
    meId: string, 
    isNotifSetting: boolean, 
    setPopoverIsVisible: Dispatch<SetStateAction<boolean>>
) => {
    const res = await handleNotifSetting(channelId, meId, isNotifSetting)
    setPopoverIsVisible(false)
}