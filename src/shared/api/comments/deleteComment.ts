export const deleteComment = async (commentId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (res.status === 201) {
            return await res.json()
        } else {
            return console.error('delete comment non 203 status');
        }
    } catch (error) {
        new Error(`Error deleteComment: ${error}`);
        return []
    }
}