"use client"

import { useState } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

interface IEllipsisText {
    text: string
    symbolCount: number
    customHandler?: () => void
    className?: string
}

export const EllipsisText:React.FC<IEllipsisText> = ({
    text,
    symbolCount,
    customHandler,
    className
}) => {
    const [isOpenText, setIsOpenText] = useState(false)

    const slicedText = text.slice(0, symbolCount)

    if (text.length < symbolCount) {
        return text
    }

    const handleClick = () => {
        if(customHandler) {
            customHandler()
        } else {
            setIsOpenText(true)
        }
    }

    return (
        <div>
            { isOpenText ?
                <div className={styles.visibleText}>
                    {text}
                    <button className={styles.stillBtn} onClick={() => setIsOpenText(false)}>Свернуть</button>
                </div>
                :
                <div className={clsx(styles.hiddenText, className)}>
                    {slicedText}
                    <span className={styles.stillBtn} onClick={() => handleClick()}>...ещё</span>
                </div>
            }
        </div>
    )

}