const SHORT_VIDEO = 
    {
        id: '16',
        name: 'SHORT101010101010101010101010101010101010101010101010101010101010101',
        videoHash: 'e354y746',
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
    }



export const getOneRandomShort = async () => {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`, {
        //     credentials: "include"
        // })

        // if (res.status === 200) {
        //     return await res.json()
        // } else {
        //     return 'getNotifs non 200 status'
        // }

        return SHORT_VIDEO

    } catch (error) {
        new Error(`Error getVideos: ${error}`);
        return []
    }
}