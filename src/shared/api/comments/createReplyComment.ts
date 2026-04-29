export const createReplyComment = async (commentText: string, videoId: string, userId: string, parentCommentId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/reply/${parentCommentId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({commentText, userId, videoId})
        })

        if (res.status === 201) {
            return await res.json()
        } else {
            return console.error('createReplyComment non 201 status');
        }
    } catch (error) {
        new Error(`Error createReplyComment: ${error}`);
        return []
    }
}