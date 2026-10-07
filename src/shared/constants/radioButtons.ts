export type VideoAccessId = 'PUBLIC' | 'PRIVATE';

export const VIDEO_ACCESS = [
    {
        id: 'PUBLIC' as VideoAccessId,
        name: 'Публичное'
    },
    {
        id: 'PRIVATE' as VideoAccessId,
        name: 'По ссылке'
    }
];