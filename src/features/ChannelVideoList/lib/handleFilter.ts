import { FiltersEnum } from "../ui";

export const handleFilter = (channelHash: string, filter: FiltersEnum, setActiveFilter: (filter: FiltersEnum) => void) => {
    setActiveFilter(filter)
    console.log('filter = ', filter);

    // делаю перезапрос данных и сую новые видео в стейт с видосами
}