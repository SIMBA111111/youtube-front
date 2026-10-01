import { IElement } from "@/shared/ui/Searcher"

export const getVideoListByName = async (name: string, offset: number = 0, limit: number = 20): Promise<Array<IElement>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos/search/${name}?offset=${offset}&limit=${limit}`)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data);
            
            return data.data.map((el: any) => {
                return {id: el.id, value: el.name}
            })
        }
        return []
    } catch (error) {
        new Error(`Error getVideoListByName: ${error}`)
        return []
    }
}