'use client'

import { DropDown, Svg, Text } from "@/shared/ui"
import { commentFilter, IFilter } from "@/widgets/Comments"
import { Dispatch, SetStateAction, useState } from "react"
import styles from "./styles.module.scss";

interface ICommetFilter {
    filter: IFilter
    setFilter: Dispatch<SetStateAction<IFilter>>
    handleChangeFilter: (newFilter: IFilter) => void
}

const FILTERS = [
    {
        id: '1',
        value: 'famous'
    },
    {
        id: '2',
        value: 'new'
    }
]

export const CommentFilter: React.FC<ICommetFilter> = ({
    filter,
    setFilter,
    handleChangeFilter
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    return (
        <div className={styles.order} >
            <div className={styles.order_text} onClick={() => setIsVisible((prev: boolean) => !prev)}>
                <Svg name="order"/>
                <Text>Упорядочить</Text>
            </div>
            <DropDown elements={FILTERS} isVisible={isVisible} setIsVisible={setIsVisible} selectedElement={filter} setSelectedElement={handleChangeFilter}/>
        </div>
    )
}