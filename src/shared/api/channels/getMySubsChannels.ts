export const getMySubsChannels = async (offset = 0, limit = 20) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/my-channels?offset=${offset}&limit=${limit}`, {
            credentials: 'include'
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('getMySubsChannels non 200 status');
        }
    } catch (error) {
        new Error(`Error getMySubsChannels: ${error}`);
        return []
    }
}