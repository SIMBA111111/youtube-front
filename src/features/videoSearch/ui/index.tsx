"use client"

import { useEffect, useRef, useState } from "react"

import { BackgroundFon, Modal, Searcher, Svg, Text } from "@/shared/ui"
import { IElement } from "@/shared/ui/Searcher"
import { voiceSearchHook } from "@/shared/hooks"

import { getVideoListByName } from '../api/getVideoListByName'

import styles from './styles.module.scss'
import Link from "next/link"
import { useRouter } from "next/navigation"


export const VideoSearch = () => {
    const [selectedElement, setSelectedElement] = useState<IElement>({
        id: '',
        value: ''
    })
    const [isOpenVoice, setIsOpenVoice] = useState<boolean>(false)
    const { startRecording, stopRecording, voiceText, isRecording }  = voiceSearchHook()
    const valueRef = useRef<string>('')
    const router = useRouter()

    useEffect(() => {
        const handleEnterKey = (e: any) => {
            if (e.key === 'Enter') {
                handleSearch()
            }
        }

        document.addEventListener("keydown", handleEnterKey)

        return () => {
            document.removeEventListener("keydown", handleEnterKey)
        }
    }, [])

    const fetchSelectedVideo = () => {
        router.push(`/watch?v=${selectedElement.id}`)
    }

    const handleSearch = () => {
        router.push(`/search?query=${valueRef.current}`)
    }

    useEffect(() => {
        fetchSelectedVideo()
    }, [selectedElement])

    useEffect(() => {
        setSelectedElement({
            ...selectedElement,
            value: voiceText
        })
    }, [voiceText])

    const handleCloseModal = (e: boolean) => {
        stopRecording()
        setIsOpenVoice(false)
    }


    return (
        <div className={styles.videoSearch}>
            <div className={styles.search}>
                <Searcher 
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    getElementsByName={getVideoListByName}
                    placeholder="Введите запрос"
                    valueRef={valueRef}
                    addonRight={
                        <div className={styles.addonRight}>
                            <Svg name="keyboard"/>
                        </div>
                    }
                />
                <button onClick={handleSearch} className={styles.magnifier}>
                    <Svg name="magnifier" size="middle"/>
                </button>
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
            <Modal isVisible={isOpenVoice} setIsVisible={handleCloseModal} className={styles.voiceModal} isOverlay={true}>
                    <div className={styles.voiceModal__container}>
                        <Text size={24} weight={300} className={isRecording ? styles.recordAnimate : ''}>Говорите...</Text>
                        <button className={styles.startBtn} onClick={() => startRecording()}>
                            <Text size={16} color="var(--whiteText)">
                                старт
                            </Text>    
                        </button>
                    </div>
            </Modal>
        </div>
    )
}