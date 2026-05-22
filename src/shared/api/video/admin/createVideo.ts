import { ITag } from "@/entities/videoTags/ui";

interface IVideoFilter {
    isShort?: boolean | null
    tags?: string
    order?: 'ASC' | 'DESC'
}

export const createVideo = async (userId: string, jwt: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-video`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({userId})
        })

        console.log(res);
        

        if (res.status === 200) {
            return await res.json()
        } 

    } catch (error) {
        new Error(`Error createVideo: ${error}`);
        return []
    }
}