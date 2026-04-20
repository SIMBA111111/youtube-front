import clsx from 'clsx'
import styles from './styles.module.scss'


type TWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 

interface IText {
    size?: number
    lineHeight?: number 
    weight?: TWeight
    color?: string
    className?: string
    children: React.ReactNode
}

export const Text: React.FC<IText> = ({
    size=14, 
    lineHeight,
    weight=400, 
    color='var(--blackText)',
    className, 
    children
}) => {

    const classesList = clsx(styles.text, className)

    return <span
        style={{fontSize: `${size}px`, lineHeight: `${lineHeight}px`, fontWeight: weight, color: color}}
        className={classesList}
    >
        {children}
    </span>
}