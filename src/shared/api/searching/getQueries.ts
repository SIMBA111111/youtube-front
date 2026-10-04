import { ISearchingEntity } from "@/entities/searching/types";

export const getQueriesList = async (query: string, offset: number = 0, limit: number = 10): Promise<Array<ISearchingEntity>> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/search-query/${encodeURIComponent(query)}?offset=${offset}&limit=${limit}`)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data);
            return data
        }
        return []
    } catch (error) {
        new Error(`Error getQueriesList: ${error}`)
        return []
    }
}