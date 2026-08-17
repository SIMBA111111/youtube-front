import { FiltersEnum } from "@/features/ChannelVideoList/ui"

const VIDEOS = [
    {
        id: '561',
        name: 'MAPHRA - Doomed (кавер на Bring Me The Horizon) | Стоит ли оно того?',
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

export const getVideoListByChannelUsername = async (channelUsername: string, isShort: boolean, filter: keyof typeof FiltersEnum = 'NEWS', limit: number = 20, offset: number = 0) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channel-videos/${channelUsername}?limit=${limit}&offset=${offset}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({filter, isShort})
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return false
        }
    } catch (error) {
        new Error(`Error getVideoListByChannelUsername: ${error}`);
        return []
    }
}