export const updateChannelInfoById = async (channelId: string, newChannelInfo: FormData) => {
    try {
        for (let [key, value] of newChannelInfo.entries()) {
            console.log(key, value);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-update/${channelId}`, {
            method: "PUT",
            body: newChannelInfo
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('updateChannelInfoById non 200 status');
        }
    } catch (error) {
        new Error(`Error updateChannelInfoById: ${error}`);
        return []
    }
}