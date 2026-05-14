export const updateSaveHistory = async (meId: string, isSaveHistory: boolean) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me/update-save-history/${meId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({isSaveHistory})
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('updateSaveHistory non 200 status');
        }
    } catch (error) {
        new Error(`Error updateSaveHistory: ${error}`);
        return []
    }
}