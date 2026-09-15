'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Svg, Text } from '@/shared/ui'
import styles from './styles.module.scss'
import { getRegisteredTranslate } from '@/shared/utils/getRegisteredTranslate'

export const LoginBtn = () => {
    const router = useRouter()

    return (
        <Link className={styles.btn} href={'/auth?stage=login'}>
            <Svg name='myAccount' color='blue'/>
            <Text weight={600} className={styles.text} color='var(--blueBorder)'>{getRegisteredTranslate('login', true)}</Text>
        </Link>
    )
}