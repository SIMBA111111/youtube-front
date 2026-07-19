interface IgetVideosIds {
    offset: number
    limit: number
    isShortVideo: boolean
}

export const getVideosIds = async ({
    offset,
    limit, 
    isShortVideo
}: IgetVideosIds
) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos-ids?offset=${offset}&limit=${limit}&isShortVideo=${isShortVideo}`)

        if (res.status === 200) {
            return await res.json()
        } else {
            return false
        }
    } catch (error) {
        new Error(`Error getVideosIds: ${error}`);
        return []
    }
}   