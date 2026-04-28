import { handleSubscription } from "@/shared/api/channels/handleSubscription";
import { Dispatch, SetStateAction } from "react";

export const handleSubscribe = async (
    channelId: string, 
    meId: string, 
    isSubscribed: boolean, 
    setPopoverIsVisible: Dispatch<SetStateAction<boolean>>
) => {
    const res = await handleSubscription(channelId, meId, isSubscribed)
    setPopoverIsVisible(false)
}