import { TTraslates } from "../types/translates";
import { svgs, TSvgs } from "./svgs";

export type TSIDEBAR_YOU = {
    id: string
    href: string
    name: TTraslates
    svgName: TSvgs
}

export const SIDEBAR_YOU: TSIDEBAR_YOU[] = [
    {
        id: '2',
        href: '/feed/history',
        name: 'history',
        svgName: svgs['history']
    },
    {
        id: '3',
        href: '/feed/playlists',
        name: 'playlists',
        svgName: svgs['playlist']
    },
    {
        id: '4',
        href: '',
        name: 'view later',
        svgName: svgs['clock']
    },
    {
        id: '5',
        href: '/feed/liked',
        name: 'liked videos',
        svgName: svgs['like']
    },
    {
        id: '6',
        href: '',
        name: 'your videos',
        svgName: svgs['video']
    },
    {
        id: '7',
        href: '',
        name: 'downloads',
        svgName: svgs['download']
    },
] as const


export type TSIDEBAR_NAVIGATION = {
    id: string
    href: string
    name: TTraslates
    svgName: TSvgs
}

export const SIDEBAR_NAVIGATION: TSIDEBAR_NAVIGATION[] = [
    {
        id: '1',
        href: '',
        name: 'music',
        svgName: svgs['music']
    },
    {
        id: '2',
        href: '',
        name: 'movies',
        svgName: svgs['movies']
    },
    {
        id: '3',
        href: '',
        name: 'videogames',
        svgName: svgs['videogame']
    },
    {
        id: '4',
        href: '',
        name: 'newForMe',
        svgName: svgs['news']
    },
    {
        id: '5',
        href: '',
        name: 'sport',
        svgName: svgs['award']
    },
] as const

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