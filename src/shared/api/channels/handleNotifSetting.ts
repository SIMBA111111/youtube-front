export const handleNotifSetting = async (videoHash: string, userId: string, isNotifSetting: boolean) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notif-setting`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({videoHash, userId, isNotifSetting})
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('handleNotifSetting non 200 status');
        }
    } catch (error) {
        new Error(`Error handleNotifSetting: ${error}`);
        return []
    }
}