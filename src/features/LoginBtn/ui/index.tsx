'use client'

import { Svg, Text } from '@/shared/ui'
import styles from './styles.module.scss'


export const LoginBtn = () => {
   
    return (
        <button className={styles.btn}>
            <Svg name='myAccount'/>
            <Text weight={600} className={styles.text}>Войти</Text>
        </button>
    )
}