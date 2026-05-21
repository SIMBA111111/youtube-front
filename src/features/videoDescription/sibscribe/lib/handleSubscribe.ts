import { updateSubscription } from "@/shared/api/channels/updateSubscription";
import { AUTH_STAGES } from "@/shared/constants/authStages";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export const handleSubscribe = async (
    channelId: string, 
    meId: string, 
    isSubscribed: boolean, 
    setIsSub: (value: boolean) => void,
    setPopoverIsVisible: Dispatch<SetStateAction<boolean>>,
    router?: AppRouterInstance
) => {

    if(!meId && router) {
        router.push(`/auth?stage=${AUTH_STAGES.LOGIN}`)
        return 
    }

    const res = await updateSubscription(channelId, meId, isSubscribed)
    setIsSub(res.isSubscribed)
    setPopoverIsVisible(false)
}