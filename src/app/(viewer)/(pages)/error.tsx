'use client'

import Link from "next/link";
import styles from './watch/styles.module.scss'
import { Text } from "@/shared/ui";

export default function VideoNotFound() {
    return (
        <div className={styles.notFound}>
            <Text size={24}>ОтшибОЧКА</Text>
            <Link href={'/'} className={styles.link}>
                На главную
            </Link>
        </div>
    )
}