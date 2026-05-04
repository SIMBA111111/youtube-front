import { updateNotifSetting } from "@/shared/api/channels/updateNotifSetting";
import { Dispatch, SetStateAction } from "react";

export const handleNotificationSettings = async (
    channelId: string, 
    meId: string, 
    isNotifSetting: boolean, 
    setIsnotifSettings: (value: boolean) => void,
    setPopoverIsVisible: Dispatch<SetStateAction<boolean>>
) => {
    const res = await updateNotifSetting(channelId, meId, isNotifSetting)
    
    setIsnotifSettings(res.isNotifSetting)
    setPopoverIsVisible(false)
}