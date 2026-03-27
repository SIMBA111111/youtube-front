const VIDEOS = [
    {
        id: '0',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: '895asd5a8s5d',
        isShort: false,
        previewUrl: '/testImages/preview.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-12T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '1',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: '$&(^#@)$(^#',
        isShort: false,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-02-22T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '2',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: 'aSkj[kasjd',
        isShort: false,
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
    {
        id: '3',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: '65576GB4Y',
        isShort: false,
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
    {
        id: '4',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: 'awdqwfwegwergf',
        isShort: false,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2023-03-22T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '5',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: 'e354y746',
        isShort: false,
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


export const getVideos = async () => {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`, {
        //     credentials: "include"
        // })

        // if (res.status === 200) {
        //     return await res.json()
        // } else {
        //     return 'getNotifs non 200 status'
        // }

        return VIDEOS

    } catch (error) {
        new Error(`Error getVideos: ${error}`);
        return []
    }
}