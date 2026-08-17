const SHORT_VIDEOS = [
    {
        id: '6',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
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
    {
        id: '7',
        name: 'SHORT2222222222222222222222222222222222222222222222222222222222',
        isShort: true,
        previewUrl: '/testImages/pr.png',
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
        id: '8',
        name: 'SHORT33333333333333333333333333333333333333333333333333333333333333333',
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
    {
        id: '9',
        name: 'SHORT4444444444444444444444444444444444444444444444444444444444444444444444444',
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
    {
        id: '10',
        name: 'SHORT5555555555555555555555555555555555555555555555555555555555555555555555555',
        isShort: true,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/pr.mp4',
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
        id: '12',
        name: 'SHORT666666666666666666666666666666666666666666666666666666666666666666666',
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
        },
    },
    {
        id: '13',
        name: 'SHORT77777777777777777777777777777777777777777777777777777777777777777777777',
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
        },
    },
    {
        id: '14',
        name: 'SHORT8888888888888888888888888888888888888888888888888888888888888888888888888',
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
        },
    },
    {
        id: '15',
        name: 'SHORT99999999999999999999999999999999999999999999999999999999999999999999999',
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
        },
    },
    {
        id: '16',
        name: 'SHORT101010101010101010101010101010101010101010101010101010101010101',
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


export const getShortVideos = async (offset: number = 0, limit: number = 5) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/short-videos?offset=${offset}&limit=${limit}`)

        if (res.status === 200) {
            return await res.json()
        } else {
            return 'getShortVideos non 200 status'
        }
    } catch (error) {
        new Error(`Error getShortVideos: ${error}`);
        return []
    }
}