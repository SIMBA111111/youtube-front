const VIDEO = {
    id: '0',
    name: 'M1111111111111111111111111111111',
    videoHash: '895asd5a8s5d',
    isShort: false,
    previewUrl: '/testImages/pr.png',
    videoPreviewUrl: '/videos/qqq.mp4',
    viewersCount: 12903,
    duration: 300,
    datePublication: '2026-03-12T13:33:12',
    // videoDescription: 'aopkjdf0asud8u0asud 96 7t g 87g87g8g87 g7878g78g87 g87yt78ty78 89g-=-=-=-=-=-=-ikasdu0asud YA98DY 8',
    videoDescription: 'aopkjdf0asud8u0asud 96 7t g 87g87g8g87 g7878g78g87 g87yt78ty78 89g-=-=-=-=-=-=-ikasdu0asudyuaysdyu 98y89 y9 y7 6t78t t 67t 76t6787g78g 876 876as 875d )(D7890 A-S7DF80A 7S897 9-Y78 89YAS9-FY 9AYSFY-9Y98-Y9 8Y9Y 89-Y 79Y 79T87 T87 T678 TR78 T78 T87T 7T A78TDF97A TYS79DTY A9SYTD9 AYS9DY A98SYD 9AYDS98 YA98DY 8',
    hashtags: 'привет, что делать, эщкере',
    likeCount: 789,
    dislikeCount: 23,
    subscribersCount: 46236,
    channel: {
        id: 'as fijas0f duasd',
        name: 'Test Channel 4',
        avatarUrl: '/testImages/testChannelAvatar.png'
    }
}

export const getVideoByHash = async (videoHash: string): Promise<any> => {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos`, {
        //     credentials: "include"
        // })

        // if (res.status === 200) {
        //     return await res.json()
        // } else {
        //     return 'getNotifs non 200 status'
        // }

        return VIDEO

    } catch (error) {
        new Error(`Error getVideoByHash: ${error}`);
        return []
    }
}