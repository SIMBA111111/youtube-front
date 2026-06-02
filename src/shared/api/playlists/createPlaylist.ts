const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const createPlaylist = async (userId: string, jwt: string, name: string, thumbnail: File) => {
    try {
        const thumbnailBase64 = await fileToBase64(thumbnail);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/playlists/create`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                userId,
                thumbnail: thumbnailBase64
            })
        });

        if (res.status === 200) {
            return await res.json();
        } else {
            const error = await res.json();
            throw new Error(error.message || 'Failed to create playlist');
        }
    } catch (error) {
        console.error('Error createPlaylist:', error);
        throw error;
    }
};