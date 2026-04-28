interface IUpdateEvaluateVideo {
    isLiked: boolean
    isDisliked: boolean
    userId: string
    videoId: string
}

export const updateEvaluateVideo = async ({
    isLiked, 
    isDisliked, 
    userId, 
    videoId
}: IUpdateEvaluateVideo
) => {
    try {
        console.log('updateEvaluateVideo');
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mark/video/${videoId}`, {
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
        new Error(`Error getVideos: ${error}`);
        return []
    }
}   