import Link from "next/link";
import styles from './styles.module.scss'
import { Text } from "@/shared/ui";

export default async function VideoNotFound() {
    return (
        <div className={styles.notFound}>
            <Text size={20}>Нет такого видео</Text>
            <Link href={'/'} className={styles.link}>
                На главную
            </Link>
        </div>
    )
}