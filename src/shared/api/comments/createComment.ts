export const createComment = async (commentText: string, videoId: string, userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/create/${videoId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({commentText, userId})
        })

        if (res.status === 201) {
            return await res.json()
        } else {
            return console.error('createComment non 201 status');
        }
    } catch (error) {
        new Error(`Error createComment: ${error}`);
        return []
    }
}