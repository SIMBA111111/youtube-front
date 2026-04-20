export const getLikedPlaylists = () => {
      const mockPlaylists = [
        {
            id: "1",
            playlistPreview: "https://images.unsplash.com/photo-1536240474400-9d843ed27245?w=400",
            playlistName: "Лучшие моменты 2024",
            channel: {
                id: "channel1",
                name: "Travel Vlog",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "travel_vlog"
            },
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-03-20T15:30:00Z",
            videos: [
                { id: "v1", title: "Видео 1", duration: "10:30" },
                { id: "v2", title: "Видео 2", duration: "15:45" },
                { id: "v3", title: "Видео 3", duration: "08:20" }
            ]
        },
        {
            id: "2",
            playlistPreview: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400",
            playlistName: "Обзоры техники 2024 Обзоры техники 2024 Обзоры техники 2024",
            channel: {
                id: "channel1",
                name: "TechReview",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "tech_review"
            },
            createdAt: "2024-01-20T14:00:00Z",
            updatedAt: "2024-03-18T12:00:00Z",
            videos: [
                { id: "v4", title: "iPhone 15 Pro", duration: "12:30" },
                { id: "v5", title: "MacBook M3", duration: "18:45" },
                { id: "v6", title: "AirPods Pro 2", duration: "09:20" },
                { id: "v7", title: "iPad Pro", duration: "14:15" }
            ]
        },
        {
            id: "3",
            playlistPreview: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
            playlistName: "Уроки программирования",
            channel: {
                id: "channel2",
                name: "CodeMaster",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "code_master"
            },
            createdAt: "2024-02-01T09:00:00Z",
            updatedAt: "2024-03-19T16:45:00Z",
            videos: [
                { id: "v8", title: "React для начинающих", duration: "45:30" },
                { id: "v9", title: "TypeScript основы", duration: "38:20" },
                { id: "v10", title: "Next.js 14", duration: "52:15" }
            ]
        },
        {
            id: "4",
            playlistPreview: "https://images.unsplash.com/photo-1513151233558-860c53928161?w=400",
            playlistName: "Кулинарные рецепты",
            channel: {
                id: "channel3",
                name: "Food Heaven",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "food_heaven"
            },
            createdAt: "2024-02-10T11:30:00Z",
            updatedAt: "2024-03-21T10:20:00Z",
            videos: [
                { id: "v11", title: "Паста карбонара", duration: "15:20" },
                { id: "v12", title: "Тирамису", duration: "22:10" },
                { id: "v13", title: "Пицца Маргарита", duration: "18:45" }
            ]
        },
        {
            id: "5",
            playlistPreview: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
            playlistName: "Путешествия по Европе",
            channel: {
                id: "channel1",
                name: "Travel Vlog",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "travel_vlog"
            },
            createdAt: "2024-02-20T13:00:00Z",
            updatedAt: "2024-03-22T14:30:00Z",
            videos: [
                { id: "v14", title: "Париж", duration: "25:30" },
                { id: "v15", title: "Рим", duration: "30:15" },
                { id: "v16", title: "Барселона", duration: "28:40" },
                { id: "v17", title: "Амстердам", duration: "22:20" },
                { id: "v18", title: "Лондон", duration: "35:10" }
            ]
        },
        {
            id: "6",
            playlistPreview: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
            playlistName: "Музыка для работы",
            channel: {
                id: "channel4",
                name: "LoFi Beats",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "lofi_beats"
            },
            createdAt: "2024-03-01T08:00:00Z",
            updatedAt: "2024-03-23T11:15:00Z",
            videos: [
                { id: "v19", title: "Study Session #1", duration: "120:00" },
                { id: "v20", title: "Study Session #2", duration: "115:30" },
                { id: "v21", title: "Relaxing Mix", duration: "180:00" }
            ]
        },
        {
            id: "7",
            playlistPreview: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
            playlistName: "Музыка для работы",
            channel: {
                id: "channel4",
                name: "LoFi Beats",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "lofi_beats"
            },
            createdAt: "2024-03-01T08:00:00Z",
            updatedAt: "2024-03-23T11:15:00Z",
            videos: [
                { id: "v19", title: "Study Session #1", duration: "120:00" },
                { id: "v20", title: "Study Session #2", duration: "115:30" },
                { id: "v21", title: "Relaxing Mix", duration: "180:00" }
            ]
        },
        {
            id: "8",
            playlistPreview: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
            playlistName: "Музыка для работы",
            channel: {
                id: "channel4",
                name: "LoFi Beats",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                hash: "lofi_beats"
            },
            createdAt: "2024-03-01T08:00:00Z",
            updatedAt: "2024-03-23T11:15:00Z",
            videos: [
                { id: "v19", title: "Study Session #1", duration: "120:00" },
                { id: "v20", title: "Study Session #2", duration: "115:30" },
                { id: "v21", title: "Relaxing Mix", duration: "180:00" }
            ]
        },
        {
        id: "9",
        playlistPreview: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400",
        playlistName: "Музыка для работы",
        channel: {
            id: "channel4",
            name: "LoFi Beats",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
            hash: "lofi_beats"
        },
        createdAt: "2024-03-01T08:00:00Z",
        updatedAt: "2024-03-23T11:15:00Z",
        videos: [
            { id: "v19", title: "Study Session #1", duration: "120:00" },
            { id: "v20", title: "Study Session #2", duration: "115:30" },
            { id: "v21", title: "Relaxing Mix", duration: "180:00" }
        ]
    }
    ];


    return mockPlaylists;
}