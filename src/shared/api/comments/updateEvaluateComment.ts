interface IUpdateEvaluateComment {
    isLiked: boolean
    isDisliked: boolean
    userId: string
    commentId: string
}

export const updateEvaluateComment = async ({
    isLiked, 
    isDisliked, 
    userId, 
    commentId
}: IUpdateEvaluateComment
) => {
    try {
        console.log('updateEvaluateComment');
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/mark/${commentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userId, isLiked, isDisliked}),
            credentials: 'include'
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return false
        }
    } catch (error) {
        new Error(`Error updateEvaluateComment: ${error}`);
        return []
    }
}   