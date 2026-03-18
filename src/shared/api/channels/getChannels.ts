const CHANNELS = [
    {
        id: 'asfijas0s dffduasd',
        name: 'Test Channel 1',
        username: 'Test Channel 1',
        avatarUrl: '/testImages/testChannelAvatar.png'
    },
    {
        id: 'asfijasdfs0fduasd',
        name: 'Test Channel 2',
        username: 'Test Channel 2',
        avatarUrl: '/testImages/testChannelAvatar.png'
    },
    {
        id: 'asfija  s0fduasd',
        name: 'Test Channel 3',
        username: 'Test Channel 3',
        avatarUrl: '/testImages/testChannelAvatar.png'
    },
    {
        id: 'as fijas0f duasd',
        name: 'Test Channel 4',
        username: 'Test Channel 4',
        avatarUrl: '/testImages/testChannelAvatar.png'
    },
    {
        id: 'asf sdfsdfijas0fduasd',
        name: 'Test Channel 5',
        username: 'Test Channel 5',
        avatarUrl: '/testImages/testChannelAvatar.png'
    },
]


export const getChannels = async () => {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifs`, {
        //     credentials: "include"
        // })

        // if (res.status === 200) {
        //     return await res.json()
        // } else {
        //     return 'getNotifs non 200 status'
        // }

        return CHANNELS

    } catch (error) {
        new Error(`Error getChannels: ${error}`);
        return []
    }
}