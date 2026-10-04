import { SearchVideoList } from "@/features";
import { upsertQuery } from "@/shared/api/searching/upsertQuery";
import styles from "./styles.module.scss";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { query } = await searchParams

    if (!query) {
      return (
        <div>
          Нет запроса
        </div>
      )
    }

    const res = await upsertQuery(query)

    return (
        <div className={styles.page}>
            <SearchVideoList query={query}/>
        </div>
    );
}
