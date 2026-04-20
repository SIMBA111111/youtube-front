import { ITag } from "@/entities/videoTags/ui";

const VIDEOS = [
    {
        id: '0',
        name: 'M1111111111111111111111111111111',
        videoHash: '895asd5a8s5d',
        isShort: false,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-12T13:33:12',
        dateViewed: '2026-04-19T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '1',
        name: 'M2222222222222222222222',
        videoHash: '$&(^#@)$(^#',
        isShort: false,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-02-22T13:33:12',
        dateViewed: '2026-04-19T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '2',
        name: 'M33333333333333333333333333333',
        videoHash: 'aSkj[kasjd',
        isShort: false,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-19T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '3',
        name: 'M44444444444444444444444444444444444444',
        videoHash: '65576GB4Y',
        isShort: false,
        previewUrl: '/testImages/preview2.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-19T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '4',
        name: 'M555555555555555555555555555555555555555555',
        videoHash: 'awdqwfwegwergf',
        isShort: false,
        previewUrl: '/testImages/preview3.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2023-03-22T13:33:12',
        dateViewed: '2026-04-19T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '51',
        name: 'M666666666666666666666666666666666666666666666',
        videoHash: 'e354y746',
        isShort: false,
        previewUrl: '/testImages/preview.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-19T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },

    {
        id: '52',
        name: 'M777777777777777777777777777777777777777777',
        videoHash: 'e354y746',
        isShort: false,
        previewUrl: '/testImages/preview4.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-19T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },

    {
        id: '53',
        name: 'M88888888888888888888888888888888888888888888888',
        videoHash: 'e354y746',
        isShort: false,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-04-18T13:33:12',
        dateViewed: '2026-03-12T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },

    {
        id: '54',
        name: 'MA999999999999999999999999999999999999999999',
        videoHash: 'e354y746',
        isShort: false,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-18T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },

    {
        id: '55',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: 'e354y746',
        isShort: false,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },

    {
        id: '56',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: 'e354y746',
        isShort: false,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '561',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
        videoHash: 'e354y746',
        isShort: false,
        previewUrl: '/testImages/testChannelAvatar.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '61',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '62',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '63',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '64',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '65',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '66',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '67',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '68',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '69',
        name: 'SHORT11111111111111111111111111111111111111111111111111',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-17T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '7',
        name: 'SHORT2222222222222222222222222222222222222222222222222222222222',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-03-12T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '8',
        name: 'SHORT33333333333333333333333333333333333333333333333333333333333333333',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-16T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '9',
        name: 'SHORT4444444444444444444444444444444444444444444444444444444444444444444444444',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-16T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '10',
        name: 'SHORT5555555555555555555555555555555555555555555555555555555555555555555555555',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/pr.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-15T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
    {
        id: '12',
        name: 'SHORT666666666666666666666666666666666666666666666666666666666666666666666',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-14T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
    },
    {
        id: '13',
        name: 'SHORT77777777777777777777777777777777777777777777777777777777777777777777777',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-13T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
    },
    {
        id: '14',
        name: 'SHORT8888888888888888888888888888888888888888888888888888888888888888888888888',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-12T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
    },
    {
        id: '15',
        name: 'SHORT99999999999999999999999999999999999999999999999999999999999999999999999',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-10T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
    },
    {
        id: '16',
        name: 'SHORT101010101010101010101010101010101010101010101010101010101010101',
        videoHash: 'e354y746',
        isShort: true,
        previewUrl: '/testImages/pr.png',
        videoPreviewUrl: '/videos/qqq.mp4',
        viewersCount: 12903,
        duration: 300,
        datePublication: '2026-03-22T13:33:12',
        dateViewed: '2026-04-09T13:33:12',
        channel: {
            id: 'as fijas0f duasd',
            name: 'Test Channel 4',
            avatarUrl: '/testImages/testChannelAvatar.png'
        }
    },
]

interface IVideoFilter {
    isShort?: boolean | null
    tags?: string[]
    order?: 'ASC' | 'DESC'
}

export const getHistoryVideos = async (filter?: IVideoFilter) => {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`, {
        //     credentials: "include"
        // })

        // if (res.status === 200) {
        //     return await res.json()
        // } else {
        //     return 'getNotifs non 200 status'
        // }
        if (filter?.isShort) {
            return VIDEOS.filter((v) => v.isShort)
        } else if(filter?.isShort === null) {
            return VIDEOS

        } else if(filter?.isShort === false) {
            return VIDEOS.filter((v) => !v.isShort)
        }

        return VIDEOS

    } catch (error) {
        new Error(`Error getVideos: ${error}`);
        return []
    }
}