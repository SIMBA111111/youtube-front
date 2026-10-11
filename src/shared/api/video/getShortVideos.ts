export const getShortVideos = async (offset: number = 0, limit: number = 5) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/short-videos?offset=${offset}&limit=${limit}`)

        if (res.status === 200) {
            return await res.json()
        } else {
            return 'getShortVideos non 200 status'
        }
    } catch (error) {
        new Error(`Error getShortVideos: ${error}`);
        return []
    }
}