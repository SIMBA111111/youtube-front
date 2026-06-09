import { ITag } from "@/entities/videoTags/ui";

interface IVideoFilter {
    isShort?: boolean | null
    tags?: string
    order?: 'ASC' | 'DESC'
}

export const createVideo = async (userId: string, jwt: string, videoData: any, videoFile: File) => {
    try {

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('videoData', JSON.stringify({...videoData, iconPreview: '' }));
        formData.append('videoFile', videoFile);
        formData.append('videoPreview', videoData.videoPreview);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-video`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${jwt}`
            },
            body: formData
        })

        console.log('res === ', res);
        

        if (res.status === 201) {
            return await res.json()
        } 

    } catch (error) {
        new Error(`Error createVideo: ${error}`);
        return []
    }
}