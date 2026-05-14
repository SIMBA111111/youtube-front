export const deleteViewersHistory = async (meId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me/my-views-history/${meId}`, {
            method: 'DELETE',
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('deleteViewersHistory non 200 status');
        }
    } catch (error) {
        new Error(`Error deleteViewersHistory: ${error}`);
        return []
    }
}