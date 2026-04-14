export const getPostsByChannelHash = (channelHash: string) => {
    const mockPosts = [
        {
            id: "post1",
            channel: {
                name: "Travel Vlog",
                avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                channelHash: "travel_vlog"
            },
            content: "Только что вернулся из невероятного путешествия в Исландию! 🇮🇸 Северное сияние, ледники и горячие источники - это было магически. Скоро выйдет большой влог, не пропустите! 🔥",
            images: [
                "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800",
                "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
                "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800"
            ],
            date_publish: "2024-03-20T15:30:00Z",
            likesCount: 1234,
            commentsCount: 89
        },
        {
            id: "post2",
            channel: {
                name: "Travel Vlog",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                channelHash: "travel_vlog"
            },
            content: "Новый обзор камеры для путешествий! 📸 Рассказываю, какую камеру выбрать для тревел-съемки, показываю примеры и делюсь лайфхаками. Ссылка в комментариях! 👇",
            images: [
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"
            ],
            date_publish: "2024-03-18T10:15:00Z",
            likesCount: 856,
            commentsCount: 45
        },
        {
            id: "post3",
            channel: {
                name: "Travel Vlog",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                channelHash: "travel_vlog"
            },
            content: "Спасибо всем за 100K подписчиков! 🎉 Это невероятное путешествие с вами. В честь этого сделаю розыгрыш - разыграю GoPro Hero 12. Условия в закрепленном комментарии!",
            images: [
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800"
            ],
            date_publish: "2024-03-15T20:00:00Z",
            likesCount: 3421,
            commentsCount: 567
        },
        {
            id: "post4",
            channel: {
                name: "Travel Vlog",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                channelHash: "travel_vlog"
            },
            content: "Как путешествовать бюджетно? 💰 Делюсь своими секретами: \n\n1. Покупайте билеты за 2-3 месяца\n2. Используйте скидочные приложения\n3. Живите в хостелах или апартаментах\n4. Ешьте в местных кафе, а не туристических\n5. Пользуйтесь общественным транспортом\n\nА вы знаете другие лайфхаки? Делитесь в комментариях! ✈️",
            images: [],
            date_publish: "2024-03-12T09:45:00Z",
            likesCount: 2345,
            commentsCount: 234
        },
        {
            id: "post5",
            channel: {
                name: "Travel Vlog",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
                channelHash: "travel_vlog"
            },
            content: "Превью нового видео про Японию! 🇯🇵 Токио, Киото, Осака и гора Фудзи. Видео выйдет в эту пятницу в 19:00. Кто ждет? 🔥",
            images: [
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
                "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
                "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",
                "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800"
            ],
            date_publish: "2024-03-10T14:00:00Z",
            likesCount: 1876,
            commentsCount: 143
        }
    ];

    // Фильтруем посты по channelHash
    return mockPosts;
};