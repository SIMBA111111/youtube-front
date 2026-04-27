'use client'

import { Svg, Text } from '@/shared/ui'
import styles from './styles.module.scss'
import { useRouter } from 'next/navigation'


export const LoginBtn = () => {
    const router = useRouter()

    return (
        <button className={styles.btn} onClick={() => router.push('/auth?stage=login')}>
            <Svg name='myAccount'/>
            <Text weight={600} className={styles.text}>Войти</Text>
        </button>
    )
}