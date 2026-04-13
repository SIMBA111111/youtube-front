const CHANNEL_INFO = {
    id: 'sd09f8u09s8uf',
    name: 'Restorator Games',
    username: '@restor',
    avatarUrl: '/testImages/pr.png',
    bannerUrl: '/testImages/pr.png',
    description: 'версус',
    subscribersCount: 41703,
    videosCount: 92,
    viewersCount: 6982374,
    country: 'RU',
    createdAt: '05-05-2020T12:12:12',
    links: [
        {
            id: 'oaijdfiojad',
            name: 'стримы',
            url: '/nansdk',
            linkAvatar: '/asdkoapskd'
        },
        {
            id: '2937898а',
            name: 'твич',
            url: '/nansdk',
            linkAvatar: '/asdkoapskd'
        }
    ]
}

export const getChannelInfo = async (hash: string) => {
    return CHANNEL_INFO 
}