interface IUpdateVideoById {
    formData: any
    videoId: string
}

export const updateVideoById = async ({
    formData,
    videoId
}: IUpdateVideoById
) => {
    try {
        console.log('formData = ', formData);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-video/${videoId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({formData}) 
        })

        if (res.status === 200) {
            return await res.json()
        } else {
            return false
        }
    } catch (error) {
        new Error(`Error updateVideoById: ${error}`);
        return []
    }
}   