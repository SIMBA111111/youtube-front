import clsx from 'clsx'

import styles from './styles.module.scss'

enum EBackgroundHoverColor {
    gray='gray',
    lightGray='lightGray',
}

interface IBackgroundFon {
    borderRadius?: number
    bacgroundColor?: string
    backgroundHoverColor?: keyof typeof EBackgroundHoverColor
    children: React.ReactNode
}

export const BackgroundFon: React.FC<IBackgroundFon> = ({
    borderRadius=100,
    bacgroundColor='var(--navigatorBackground)', 
    backgroundHoverColor='lightGray', 
    children
}) => {

    const classList = clsx(
        styles.BackgroundFon,
        styles[`BackgroundFon__${backgroundHoverColor}`],
    );

    return (
        <div
            style={{borderRadius: `${borderRadius}px`, backgroundColor: bacgroundColor}}
            className={classList}
        >
            <div>
                {children}
            </div>
        </div>
    )
}