const VIDEOS = [
    {
        id: '561',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        isShort: true,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
]

interface IGetVideoListBySubs {
    meId: string, 
    onlyShorts: boolean, 
    onlyFull: boolean
    offset: number
    limit: number
}

export const getVideoListBySubs = async ({meId, onlyShorts, onlyFull, limit, offset}: IGetVideoListBySubs) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos/my-subs/${meId}?limit=${limit}&offset=${offset}&onlyShorts=${onlyShorts}&onlyFull=${onlyFull}`)

        if (res.status === 200) {
            return await res.json()
        } else {
            return false
        }
    } catch (error) {
        new Error(`Error getVideoListBySubs: ${error}`);
        return []
    }
}