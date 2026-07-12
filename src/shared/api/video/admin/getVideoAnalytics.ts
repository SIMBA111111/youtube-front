export const getVideoAnalytics = async (videoId: string, dateRange: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video-analytics/${videoId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({dateRange: dateRange})
        })

        console.log('res ============================= ', res);

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('getVideoAnalytics non 200 status');
        }
    } catch (error) {
        new Error(`Error getVideoAnalytics: ${error}`);
        return []
    }
}