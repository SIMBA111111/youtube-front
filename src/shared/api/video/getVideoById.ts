export const getVideoById = async (videoId: string, channelId?: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos/${videoId}`, {
            method: 'GET',
            body: JSON.stringify({channelId: channelId}),
            credentials: 'include'
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return 'getVideoById non 200 status'
        }
    } catch (error) {
        new Error(`Error getVideoById: ${error}`);
        return []
    }
}