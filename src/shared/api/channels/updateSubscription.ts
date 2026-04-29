export const updateSubscription = async (channelId: string, userId: string, isSubscribed: boolean) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscribe`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({channelId, userId, isSubscribed})
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('handleSubscription non 200 status');
        }
    } catch (error) {
        new Error(`Error handleSubscription: ${error}`);
        return []
    }
}