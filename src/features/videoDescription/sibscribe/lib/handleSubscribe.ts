import { updateSubscription } from "@/shared/api/channels/updateSubscription";
import { Dispatch, SetStateAction } from "react";

export const handleSubscribe = async (
    channelId: string, 
    meId: string, 
    isSubscribed: boolean, 
    setPopoverIsVisible: Dispatch<SetStateAction<boolean>>
) => {
    const res = await updateSubscription(channelId, meId, isSubscribed)
    setPopoverIsVisible(false)
}