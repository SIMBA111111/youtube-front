export const getVideoById = async (videoId: string, channelId?: string): Promise<any> => {
    console.log('getVideoById=-=-')
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/video/${videoId}?channelId=${channelId}`)

        console.log('res: ', res);

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