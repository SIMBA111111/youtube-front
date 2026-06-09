export type VideoAccessId = 'public' | 'byLink';

export const VIDEO_ACCESS = [
    {
        id: 'public' as VideoAccessId,
        name: 'Публичное'
    },
    {
        id: 'byLink' as VideoAccessId,
        name: 'По ссылке'
    }
];