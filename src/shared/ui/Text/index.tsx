import styles from './styles.module.scss'


type TWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 

interface IText {
    size?: number 
    weight?: TWeight
    color?: string
    children: React.ReactNode
}

export const Text: React.FC<IText> = ({
    size=16, 
    weight=500, 
    color='var(--blackText)', 
    children
}) => {
    return <span
        style={{fontSize: `${size}px`, fontWeight: weight, color: color}}
        className={styles.text}
    >
        {children}
    </span>
}