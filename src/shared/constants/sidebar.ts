import { svgs } from "./svgs";

export const SIDEBAR_YOU = [
    {
        id: '2',
        href: '/feed/history',
        name: 'История',
        svgName: svgs['history']
    },
    {
        id: '3',
        href: '/feed/playlists',
        name: 'Плейлисты',
        svgName: svgs['playlist']
    },
    {
        id: '4',
        href: '',
        name: 'Смотреть позже',
        svgName: svgs['clock']
    },
    {
        id: '5',
        href: '/feed/liked',
        name: 'Понравившиеся',
        svgName: svgs['like']
    },
    {
        id: '6',
        href: '',
        name: 'Ваши видео',
        svgName: svgs['video']
    },
    {
        id: '7',
        href: '',
        name: 'Скачанное',
        svgName: svgs['download']
    },
]


export const SIDEBAR_NAVIGATION = [
    {
        id: '1',
        href: '',
        name: 'Музыка',
        svgName: svgs['music']
    },
    {
        id: '2',
        href: '',
        name: 'Фильмы',
        svgName: svgs['movies']
    },
    {
        id: '3',
        href: '',
        name: 'Видеоигры',
        svgName: svgs['videogame']
    },
    {
        id: '4',
        href: '',
        name: 'Новости',
        svgName: svgs['news']
    },
    {
        id: '5',
        href: '',
        name: 'Спорт',
        svgName: svgs['award']
    },
]

export const CREATOR_SIDEBAR = [
    {
        id: '0',
        href: (channelId: string) => `/creator/${channelId}/videos`,
        name: 'Контент',
        svgName: svgs['content']
    },
    {
        id: '1',
        href: (channelId: string) => `/creator/${channelId}/analytics`,
        name: 'Аналитика',
        svgName: svgs['analytics']
    },
    {
        id: '2',
        href: (channelId: string) => `/creator/${channelId}/editing/profile`,
        name: 'Настройки канала',
        svgName: svgs['magic']
    },
]

export const CREATOR_VIDEO_SIDEBAR = [
    {
        id: '0',
        href: (videoId: string) => `/video/${videoId}/edit`,
        name: 'Редактировать',
        svgName: svgs['comments']
    },
    {
        id: '1',
        href: (videoId: string) => `/video/${videoId}/analytics`,
        name: 'Аналитика',
        svgName: svgs['analytics']
    },
    {
        id: '2',
        href: (videoId: string) => `/video/${videoId}/comments`,
        name: 'Комментарии',
        svgName: svgs['comments']
    },
]