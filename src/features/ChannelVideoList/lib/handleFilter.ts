import { FiltersEnum } from "../ui";

export const handleFilter = (channelUsername: string, filter: FiltersEnum, setActiveFilter: (filter: FiltersEnum) => void) => {
    setActiveFilter(filter)
    // делаю перезапрос данных и сую новые видео в стейт с видосами
}