"use client"

import { useEffect, useRef, useState } from "react"

import { BackgroundFon, Modal, Searcher, Svg, Text } from "@/shared/ui"
import { IElement } from "@/shared/ui/Searcher"
import { voiceSearchHook } from "@/shared/hooks"

import { getVideoTitlesByName } from '../api/getElementByName'

import styles from './styles.module.scss'


export const VideoSearch = () => {
    const [selectedElement, setSelectedElement] = useState<IElement>({
        id: '',
        value: ''
    })
    const [isOpenVoice, setIsOpenVoice] = useState<boolean>(false)
    const { startRecording, voiceText }  = voiceSearchHook()
    
    useEffect(() => {
        setSelectedElement({
            ...selectedElement,
            value: voiceText
        })

        setIsOpenVoice(false)
    }, [voiceText])

    return (
        <div className={styles.videoSearch}>
            <div className={styles.search}>
                <Searcher 
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    getElementsByName={getVideoTitlesByName}
                    placeholder="Введите запрос"
                    addonRight={
                        <div className={styles.addonRight}>
                            <Svg name="keyboard"/>
                        </div>
                    }
                />
                <div className={styles.magnifier}>
                    <Svg name="magnifier" size="middle"/>
                </div>
            </div>
            <div className={styles.micro} onClick={() => {setIsOpenVoice(true)}}>
                <BackgroundFon backgroundHoverColor='lightGray'>
                    <div style={{marginTop: '2px'}}>
                        <Svg name='micro'/>
                    </div>
                </BackgroundFon>
                <div className={styles.voiceSearchText}>
                    <Text size={14} color='var(--whiteText)' weight={300}>Голосовой поиск</Text>
                </div>
            </div>
            <Modal isVisible={isOpenVoice} setIsVisible={setIsOpenVoice} clasName={styles.voiceModal}>
                    <div className={styles.voiceModal__container}>
                        <Text size={24} weight={300}>Говорите...</Text>
                        <button onClick={() => startRecording()}>старт</button>
                    </div>
            </Modal>
        </div>
    )
}