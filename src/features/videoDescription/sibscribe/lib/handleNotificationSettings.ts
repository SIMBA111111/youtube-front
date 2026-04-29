import { updateNotifSetting } from "@/shared/api/channels/updateNotifSetting";
import { Dispatch, SetStateAction } from "react";

export const handleNotificationSettings = async (
    channelId: string, 
    meId: string, 
    isNotifSetting: boolean, 
    setPopoverIsVisible: Dispatch<SetStateAction<boolean>>
) => {
    const res = await updateNotifSetting(channelId, meId, isNotifSetting)
    setPopoverIsVisible(false)
}