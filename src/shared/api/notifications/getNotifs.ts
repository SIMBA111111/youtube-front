const NOTIFS = [
    {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: false,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },
        {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: false,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },
        {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: false,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },
        {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: false,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },
        {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: true,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },    {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: false,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },
        {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: false,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },
        {
        id: 'askdfljalksjd',
        createdAt: '2026-03-16T11:54:00Z',
        isViewed: false,
        channel: {
            id: 'askldjklajd',
            name: 'RestoratorGame',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 'aksdjkasjkd',
            previewUrl: '/testImages/testVideoPreview.png',
            videoHash: '8dy)sdy00A8&7h',
            isShort: false
        }
    },
]


export const getNotifs = async () => {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifs`, {
        //     credentials: "include"
        // })

        // if (res.status === 200) {
        //     return await res.json()
        // } else {
        //     return 'getNotifs non 200 status'
        // }

        return NOTIFS

    } catch (error) {
        new Error(`Error getNotifs: ${error}`);
        return []
    }
}