"use client"

import { useState } from 'react'
import styles from './styles.module.scss'

interface IEllipsisText {
    text: string
    symbolCount: number
}

export const EllipsisText:React.FC<IEllipsisText> = ({
    text,
    symbolCount
}) => {
    const [isOpenText, setIsOpenText] = useState(false)

    const slicedText = text.slice(0, symbolCount)

    if (text.length < symbolCount) {
        return text
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
                    <span className={styles.stillBtn} onClick={() => setIsOpenText(true)}>...ещё</span>
                </div>
            }
        </div>
    )

}