import { IElement } from "@/shared/ui/Searcher"

export const getVideoListByName = async (name: string): Promise<Array<IElement>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos/search/${name}`)
        if (res.status === 200) {
            const data = await res.json()
            return data.map((el: any) => {
                return {id: el.video_hash, value: el.name}
            })
        }
        return []
    } catch (error) {
        new Error(`Error getVideoListByName: ${error}`)
        return []
    }
}