import { cookies } from "next/headers"

interface IAuthData {
    id: string
    avatarUrl: string
    email: string
    name: string
    username: string
    lang: string
}

export const getAuthData = async (): Promise<IAuthData | null> => {
    const cookie = await cookies()

    const userData = cookie.get('channelData')?.value ? JSON.parse(cookie.get('channelData')?.value) : null
    const lang = cookie.get('lang')?.value ? cookie.get('lang')?.value : navigator.language.slice(0, 2);
    
    return {...userData, lang: lang} 
}