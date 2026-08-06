import { SearchVideoList } from "@/features";
import styles from "./styles.module.scss";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { query } = await searchParams

    return (
        <div className={styles.page}>
            <SearchVideoList query={query as string}/>
        </div>
    );
}
