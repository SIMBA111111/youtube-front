const COMMENTS = [
    {
        id: '1',
        comment: 'Отличное видео! Очень полезная информация, спасибо автору! 🔥',
        likes: 1247,
        dislikes: 12,
        datePublication: '2025-03-15T10:30:00Z',
        channel: {
            id: 'ch1',
            username: 'Алексей Петров',
            avatarUrl: '/testImages/pr.png'
        },
        video: {
            id: 's'
        },
        isReplyTo: '1',
        relatedCommentsCount: 8
    },
    {
        id: '2',
        comment: 'Наконец-то понял эту тему. Объясняешь лучше чем в универе 😄',
        likes: 892,
        dislikes: 5,
        datePublication: '2025-03-15T12:15:00Z',
        channel: {
            id: 'ch2',
            username: 'Мария Иванова',
            avatarUrl: '/testImages/testChannelAvatar.png'
        },
        video: {
            id: 's'
        },
        isReplyTo: '1',
        relatedCommentsCount: 3
    },
    {
        id: '3',
        comment: 'А можно видос про продвинутую работу с хуками? Было бы круто!',
        likes: 534,
        dislikes: 2,
        datePublication: '2025-03-14T18:45:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch3',
            username: 'Дмитрий Сидоров',
            avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        relatedCommentsCount: 5
    },
    {
        id: '4',
        comment: 'Лучший канал по фронтенду! Качество контента просто топ 👌',
        likes: 2103,
        dislikes: 8,
        datePublication: '2025-03-14T09:20:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch4',
            username: 'Елена Смирнова',
            avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        relatedCommentsCount: 12
    },
    {
        id: '5',
        comment: 'Спорный момент в 5:34. По-моему можно было сделать через useCallback',
        likes: 67,
        dislikes: 23,
        datePublication: '2025-03-13T22:10:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch5',
            username: 'Павел Козлов',
            avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
        },
        relatedCommentsCount: 15
    },
    {
        id: '6',
        comment: 'Спасибо за туториал! Сделал свой первый проект благодаря тебе 🙏',
        likes: 445,
        dislikes: 1,
        datePublication: '2025-03-13T15:30:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch6',
            username: 'Анна Морозова',
            avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg'
        },
        relatedCommentsCount: 2
    },
    {
        id: '7',
        comment: 'Жду видос про TypeScript generics. Когда выйдет?',
        likes: 321,
        dislikes: 4,
        datePublication: '2025-03-12T11:00:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch7',
            username: 'Артем Волков',
            avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg'
        },
        relatedCommentsCount: 0
    },
    {
        id: '8',
        comment: 'Класс! Очень структурированно и понятно. Лайк однозначно 👍',
        likes: 678,
        dislikes: 3,
        datePublication: '2025-03-12T08:45:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch8',
            username: 'Ольга Новикова',
            avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg'
        },
        relatedCommentsCount: 6
    },
    {
        id: '9',
        comment: 'А есть видео про Next.js 15? Очень актуально сейчас',
        likes: 234,
        dislikes: 1,
        datePublication: '2025-03-11T19:20:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch9',
            username: 'Игорь Соколов',
            avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg'
        },
        relatedCommentsCount: 4
    },
    {
        id: '10',
        comment: 'Немного затянуто в начале, но в целом полезно. Спасибо!',
        likes: 89,
        dislikes: 34,
        datePublication: '2025-03-11T14:10:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch10',
            username: 'Татьяна Кузнецова',
            avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg'
        },
        relatedCommentsCount: 1
    },
    {
        id: '11',
        comment: 'Огонь! Так держать! Подписался и нажал колокольчик 🔔',
        likes: 1567,
        dislikes: 0,
        datePublication: '2025-03-10T23:30:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch11',
            username: 'Максим Андреев',
            avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg'
        },
        relatedCommentsCount: 21
    },
    {
        id: '12',
        comment: 'Реально помогло. Уже 2 дня мучился с этой проблемой',
        likes: 423,
        dislikes: 2,
        datePublication: '2025-03-10T17:55:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch12',
            username: 'Наталья Павлова',
            avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg'
        },
        relatedCommentsCount: 7
    },
    {
        id: '13',
        comment: 'Можно туториал по Zustand? Redux уже надоел :D',
        likes: 512,
        dislikes: 8,
        datePublication: '2025-03-09T13:40:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch13',
            username: 'Владимир Степанов',
            avatarUrl: 'https://randomuser.me/api/portraits/men/13.jpg'
        },
        relatedCommentsCount: 9
    },
    {
        id: '14',
        comment: 'Супер! Жду продолжения. Твой контент всегда в топ 🔥🔥🔥',
        likes: 891,
        dislikes: 1,
        datePublication: '2025-03-09T10:15:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch14',
            username: 'Ксения Федорова',
            avatarUrl: 'https://randomuser.me/api/portraits/women/14.jpg'
        },
        relatedCommentsCount: 3
    },
    {
        id: '15',
        comment: 'А где взять такой же крутой микрофон? Звук отличный!',
        likes: 178,
        dislikes: 0,
        datePublication: '2025-03-08T20:00:00Z',
        video: {
            id: 's'
        },
        isReplyTo: '1',
        channel: {
            id: 'ch15',
            username: 'Николай Тимофеев',
            avatarUrl: 'https://randomuser.me/api/portraits/men/15.jpg'
        },
        relatedCommentsCount: 2
    }
]
export const getCommentsByVideoHash = async (videoHash: string) => {
    
    return COMMENTS
}