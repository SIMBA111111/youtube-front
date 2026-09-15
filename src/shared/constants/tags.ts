export type THISTORY_TAGS = {
    id: string
    name: string
}

export const HISTORY_TAGS: THISTORY_TAGS[] = [
    {
        id: '1',
        name: 'all'
    },
    {
        id: '2',
        name: 'videos'
    },
    {
        id: '3',
        name: 'shorts'
    },
    {
        id: '4',
        name: 'Подкасты'
    },
    {
        id: '5',
        name: 'Музыка'
    },
] as const

export const LIKED_TAGS = [
    {
        id: '1',
        name: 'all'
    },
    {
        id: '2',
        name: 'videos'
    },
    {
        id: '3',
        name: 'shorts'
    },
]