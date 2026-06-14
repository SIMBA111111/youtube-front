export const getPlaylistById = async (ids: string[]) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playlists-by-id`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ids})
        });

        if (res.status === 200) {
            return await res.json();
        } else {
            const error = await res.json();
            throw new Error(error.message || 'Failed to create playlist');
        }
    } catch (error) {
        console.error('Error getPlaylistById:', error);
        throw error;
    }
};