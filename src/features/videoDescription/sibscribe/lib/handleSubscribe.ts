import { updateSubscription } from "@/shared/api/channels/updateSubscription";
import { Dispatch, SetStateAction } from "react";

export const handleSubscribe = async (
    channelId: string, 
    meId: string, 
    isSubscribed: boolean, 
    setIsSub: (value: boolean) => void,
    setPopoverIsVisible: Dispatch<SetStateAction<boolean>>
) => {
    const res = await updateSubscription(channelId, meId, isSubscribed)
    setIsSub(res.isSubscribed)
    setPopoverIsVisible(false)
}