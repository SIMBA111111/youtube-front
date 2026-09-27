'use client'

import { DropDown, Svg, Text } from "@/shared/ui"
import { IFilter } from "@/widgets/Comments"
import { Dispatch, SetStateAction, useState } from "react"
import { getRegisteredTranslate } from "@/shared/utils/getRegisteredTranslate";
import styles from "./styles.module.scss";


export type TCommentFilter = 'famous' | 'new';

export const FILTERS: IFilter[] = [
  { id: 'famous', value: getRegisteredTranslate('famous') as TCommentFilter },
  { id: 'new', value: getRegisteredTranslate('new') as TCommentFilter },
];

interface ICommetFilter {
    filter: IFilter
    setFilter: Dispatch<SetStateAction<IFilter>>
}

export const CommentFilter: React.FC<ICommetFilter> = ({
    filter,
    setFilter
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    return (
        <div className={styles.order} >
            <div className={styles.order_text} onClick={() => setIsVisible((prev: boolean) => !prev)}>
                <Svg name="order"/>
                <Text>Упорядочить</Text>
            </div>
            <DropDown className={styles.customFilters} elements={FILTERS} isVisible={isVisible} setIsVisible={setIsVisible} selectedElement={filter} setSelectedElement={setFilter}/>
        </div>
    )
}