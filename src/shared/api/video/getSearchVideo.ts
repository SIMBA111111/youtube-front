export const getSearchVideos = async (searchValue: string, offset: string, limit: string): Promise<any> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video/${videoHash}`, {
            method: 'POST',
            body: JSON.stringify({channelId}),
            headers: { 'Content-Type': 'application/json' },
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return 'getSearchVideos non 200 status'
        }
    } catch (error) {
        new Error(`Error getSearchVideos: ${error}`);
        return []
    }
}