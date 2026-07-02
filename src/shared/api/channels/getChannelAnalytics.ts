export const getChannelAnalytics = async (channelId: string, dateRange: string, tab: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-analytics/${channelId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({dateRange: dateRange, tab: tab})
        })

        console.log(res);

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('getChannelAnalytics non 200 status');
        }
    } catch (error) {
        new Error(`Error getChannelAnalytics: ${error}`);
        return []
    }
}