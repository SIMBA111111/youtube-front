interface IUpdateViewVideo {
    userId: string
    videoId: string
}

export const updateViewVideo = async ({
    userId, 
    videoId
}: IUpdateViewVideo
) => {
    try {
        console.log('updateViewVideo');
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/view/video/${videoId}?userId=${userId}`)

        console.log(res);
        

        if (res.status === 200) {
            return await res.json()
        } else {
            return false
        }
    } catch (error) {
        new Error(`Error updateViewVideo: ${error}`);
        return []
    }
}   