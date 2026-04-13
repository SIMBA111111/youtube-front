"use client"

import { useState } from 'react'
import styles from './styles.module.scss'

interface IEllipsisText {
    text: string
    symbolCount: number
    customHandler?: () => void
}

export const EllipsisText:React.FC<IEllipsisText> = ({
    text,
    symbolCount,
    customHandler
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
                <div className={styles.hiddenText}>
                    {slicedText}
                    <span className={styles.stillBtn} onClick={() => handleClick()}>...ещё</span>
                </div>
            }
        </div>
    )

}