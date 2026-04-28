'use client'

import { useState } from 'react'
import { Popover, Svg, Text } from '@/shared/ui'
import styles from './styles.module.scss'

export enum notificationSettings {
    All='ALL',
    NOONE='NOONE',
}

interface ISubscribeButton {
    isSubscribed: boolean
    notificationSetting: boolean
}

export const SubscribeButton: React.FC<ISubscribeButton> = ({
    isSubscribed,
    notificationSetting
}) => {
    const [popoverIsVisible, setPopoverIsVisible] = useState<boolean>(false)

    if(isSubscribed) {
        return (
            <button className={styles.subscribeButton_btn} onClick={() => setPopoverIsVisible(prev => !prev)}>
                <div className={styles.unsibscribe}>
                    <Svg name="bell" />
                    <Text className={styles.unsibscribe_text}>Вы подписаны</Text>
                    <Svg name="shortArrowDown" />
                    <Popover isOpen={popoverIsVisible} onClose={() => setPopoverIsVisible(false)} offset={20} className={styles.popover}>
                        <div className={styles.popover_items}>
                            <div className={`${styles.popover_item} ${notificationSetting ? styles.popover_item_active : ''}`}>
                                <Svg name='bell' />
                                <Text weight={400}>Все</Text>
                            </div>
                            <div className={`${styles.popover_item} ${!notificationSetting ? styles.popover_item_active : ''}`}>
                                <Svg name='crossedBell' />
                                <Text weight={400}>Никакие</Text>
                            </div>
                            <div className={styles.popover_item}>
                                <Svg name='describe' />
                                <Text weight={400}>Отменить подписку</Text>
                            </div>
                        </div>
                    </Popover>
                </div> 
            </button>
        )
    } else {
        return (
            <button className={styles.subscribeButton}>
                <Text className={styles.subscribeButton_btn_text} color="var(--whiteText)">Подписаться</Text>
            </button>
        )
    }

}