'use client'

import { usePathname } from "next/navigation"
import { FC } from "react"
import Link from "next/link"

import { svgs } from "@/shared/constants/svgs"
import { Svg, Text } from "@/shared/ui"

import styles from './styles.module.scss'


interface INavigationItem {
    name: string
    href: string
    svgName: keyof typeof svgs
}

export const NavigationItem: FC<INavigationItem> = ({
    name,
    href,
    svgName
}) => {
    const path = usePathname()
    const isActivePath = href.split('/').pop() === path.split('/').pop()

    return (
        <div className={styles.route} key={name}>
            {isActivePath ? <Svg name={svgName + 'Fill' as keyof typeof svgs}/> : <Svg name={svgName as keyof typeof svgs}/>}
            <Link href={href}>
                <Text>{name}</Text>
            </Link>
        </div>
    )
}