'use client'

import { Dispatch, FC, SetStateAction, useRef, useState } from "react"
import { Text } from "../Text";
import { Svg } from "../Svg";
import styles from './styles.module.scss'

interface IChooseInput<T extends { name: string } = { name: string }> {
    choosenData: T[]
    setChoosenData: Dispatch<SetStateAction<T[]>>
}

export const ChooseInput = <T extends { name: string }>({ 
    choosenData,
    setChoosenData
}: IChooseInput<T>) => {
    const [choosen, setChoosen] = useState<T[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleAddChoosen = (e: MouseEvent) => {
        e.preventDefault()
        const value = inputRef.current?.value;
        if (value) {
            const newItem = { name: value } as T;
            // setChoosen(prev => [...prev, newItem])
            setChoosenData(prev => [...prev, newItem])
            inputRef.current.value = '';
        }
    }

    const handleDeleteChoosenItem = (e: MouseEvent, index: number) => {
        e.preventDefault()
        // setChoosen(prev => prev.filter((_, i) => i !== index))
        setChoosenData(prev => prev.filter((_, i) => i !== index))
    }

    console.log('choosenData ====== ', choosenData);
    

    return (
        <div className={styles.choosenInput}>
            <div className={styles.items}>
                {choosenData.map((item, index) => 
                    <div key={index} className={styles.choosenItem}>
                        <Text>{item.name}</Text>
                        <button className={styles.removeBtn} onClick={(e) => handleDeleteChoosenItem(e, index)}>
                            <Svg name="cross" />
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.inputContainer}>
                <input type="text" ref={inputRef} className={styles.input}/>
                
                <button className={styles.checkBtn} onClick={(e) => handleAddChoosen(e)}>
                    <Svg name="check"/>
                </button>
            </div>
        </div>
    )
}