const CHANNEL_INFO = {
    id: 'sd09f8u09s8uf',
    name: 'Restorator Games',
    username: '@restor',
    avatarUrl: '/testImages/pr.png',
    bannerUrl: '/testImages/pr.png',
    description: 'версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус версус',
    email: 'fakowdude@gmail.com',
    subscribersCount: 41703,
    videosCount: 92,
    viewersCount: 6982374,
    country: 'RU',
    createdAt: '05-05-2020T12:12:12',
    isSubscribed: true,
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

export const getChannelInfoById = async (userId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-info-by-id/${userId}`)

        console.log(res);

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('getChannelInfo non 200 status');
        }
    } catch (error) {
        new Error(`Error getChannelInfo: ${error}`);
        return []
    }
}