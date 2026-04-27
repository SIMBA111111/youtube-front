import { IElement } from "@/shared/ui/Searcher"

const MOCK_DATA = [
    {
        id: '1',
        title: 'Перворе видео' 
    },
    {
        id: '2',
        title: 'второе видео' 
    },
    {
        id: '3',
        title: 'третье видео' 
    },
    {
        id: '4',
        title: 'червертое видео' 
    },
    {
        id: '5',
        title: 'пятое видео' 
    },
]


export const getVideoListByName = async (name: string): Promise<Array<IElement>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos/search/${name}`)
        if (res.status === 200) {
            const data = await res.json()
            return data.map((el: any) => {
                return {id: el.id, value: el.name}
            })
        }
        return []
    } catch (error) {
        new Error(`Error getVideoListByName: ${error}`)
        return []
    }
}