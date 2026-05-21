import { LoginBtn } from "@/features"
import { Svg, Text } from "@/shared/ui"

import styles from './styles.module.scss'
import { svgs } from "@/shared/constants/svgs"
import { FC } from "react"

interface IUnauthorizedWidget {
    title: string
    svgName: keyof typeof svgs
}


export const UnauthorizedWidget: FC<IUnauthorizedWidget> = ({title, svgName}) => {
    return (
        <div className={styles.container}>
            <Svg name={svgName} size="large" />
            <Text size={24}>Войдите в аккаунт</Text>
            <Text size={14}>{title}</Text>
            <LoginBtn/>
        </div>
    )
}