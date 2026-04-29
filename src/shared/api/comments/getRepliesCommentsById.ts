const REPLIES_COMMENTS = [
    {
        id: '1',
        comment: '1111111111111111111111111111111111111111',
        likes: 5,
        dislikes: 12,
        datePublication: '2025-03-15T10:30:00Z',
        channel: {
            id: 'ch1',
            username: 'Алексей Петров',
            avatarUrl: '/testImages/preview3.png'
        },
        relatedCommentsCount: 8
    },
    {
        id: '2',
        comment: '22222222222222222222222222222222222222',
        likes: 56,
        dislikes: 5,
        datePublication: '2025-03-15T12:15:00Z',
        channel: {
            id: 'ch2',
            username: 'Мария Иванова',
            avatarUrl: '/testImages/preview2.png'
        },
        relatedCommentsCount: 3
    },
    {
        id: '3',
        comment: '33333333333333333333333333333333333333',
        likes: 90,
        dislikes: 2,
        datePublication: '2025-03-14T18:45:00Z',
        channel: {
            id: 'ch3',
            username: 'Дмитрий Сидоров',
            avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        relatedCommentsCount: 5
    },
]


export const getRepliesCommentsById = async (parentCommentId: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/replies-comments/${parentCommentId}`)

        if (res.status === 200) {
            return await res.json()
        } else {
            return console.error('getRepliesCommentsById non 200 status');
        }
    } catch (error) {
        new Error(`Error getRepliesCommentsById: ${error}`);
        return []
    }
}