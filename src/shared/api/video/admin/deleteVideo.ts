export const deleteVideo = async (userId: string, videoId: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-video/${videoId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId: userId})
        })

        if (res.status === 204) {
            return await res.json()
        } 

    } catch (error) {
        new Error(`Error deleteVideo: ${error}`);
        return []
    }
}