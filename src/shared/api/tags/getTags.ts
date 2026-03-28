const TAGS = [
    {
        id: '0',
        name: 'Все',
    },
    {
        id: '1',
        name: 'Видеоигры',
    },
    {
        id: '2',
        name: 'Музыка',
    },
    {
        id: '3',
        name: 'Джемы',
    },
    {
        id: '4',
        name: 'Подкасты',
    },
    {
        id: '5',
        name: 'Экшен и приключения',
    },
    {
        id: '6',
        name: 'Рэп',
    },
    {
        id: '7',
        name: 'Недавно опубликованные',
    },
    {
        id: '8',
        name: 'Просмотренно',
    },
    {
        id: '9',
        name: 'Новое для вас',
    },
]


export const getTags = async () => {
    try {
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notifs`, {
        //     credentials: "include"
        // })

        // if (res.status === 200) {
        //     return await res.json()
        // } else {
        //     return 'getNotifs non 200 status'
        // }

        return TAGS

    } catch (error) {
        new Error(`Error getTags: ${error}`);
        return []
    }
}