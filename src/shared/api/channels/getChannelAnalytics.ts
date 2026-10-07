import { ApiResponse, ApiResponseDTO } from "@/shared/types/apiResponse";

export type TAnalyticEntity = Record<string, number>

interface IGetChannelAnalytics {
    analyticData: TAnalyticEntity
    totalViews: number;
    totalSubscriptions: number;
}

export interface ITabHeaderData {
    totalViews: number;
    totalSubscriptions: number;
}

export const getChannelAnalytics = async (
    channelId: string, 
    dateRange: string, 
    tab: string
): Promise<ApiResponse<IGetChannelAnalytics | null>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-analytics/${channelId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({dateRange: dateRange, tab: tab})
        })

        if (res.status === 200)
            return await res.json()

        return new ApiResponseDTO<null>
    } catch (error) {
        new Error(`Error getChannelAnalytics: ${error}`);
        return new ApiResponseDTO<null>
    }
}