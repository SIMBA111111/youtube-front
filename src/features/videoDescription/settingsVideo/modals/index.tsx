'use client'

import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { getReportReasons } from "@/shared/api/video/getReportReasons"
import { Modal, RadioButton, Svg, Text } from "@/shared/ui"
import styles from './styles.module.scss'
import { log } from "console"

interface IReportModal {
    isOpenedModal: boolean
    setIsOpenedModal: Dispatch<SetStateAction<boolean>>
}

export const ReportModal: React.FC<IReportModal> = ({
    isOpenedModal,
    setIsOpenedModal
}) => {
    const [selectedReportId, setSelectedReportId] = useState<string>()
    const [modalStep, setModalStep] = useState<number>(1)
    const [reportReasons, setReportReasons] = useState<Record<string, string>[]>()

    useEffect(() => {
        const handleGetReportReasons = async () => {
            if(isOpenedModal) {
                const res = await getReportReasons()
                setReportReasons(res)
            }
        }

        if(isOpenedModal) {
            handleGetReportReasons()
        }

    }, [isOpenedModal])

    const handleCloseModal = () => {
        setSelectedReportId('')
        setModalStep(1)
        setIsOpenedModal(false)
    }

    const handleSendReport = (formData: FormData) => {
        console.log('formData = ', formData.get('reportText'));
        handleCloseModal()
    }

    if (modalStep === 1) {
        return (
            <Modal 
                isVisible={isOpenedModal} 
                setIsVisible={handleCloseModal} 
                isOverlay 
                className={styles.customModal} 
                isCloseButton={true} 
                title={<Text color="var(--blackText)" size={22}>Пожаловаться</Text>}
            >
                <div className={styles.customModal_content}>
                    <div className={styles.customModal_content_text}>
                        <Text>Выберите причину жалобы</Text>
                        <Text lineHeight={20} size={14}>Ничего страшного, если укажете причину неправильно. Мы проверим контент на соответствие всем правилам сообщества.</Text>
                        <RadioButton options={reportReasons} value={selectedReportId} onChange={setSelectedReportId} className={styles.optionsList}/>
                    </div>
                    <button 
                        className={styles.customModal_content_btn} 
                        disabled={selectedReportId ? false : true} 
                        onClick={() => setModalStep(2)}
                    >
                        Далее
                    </button>
                </div>
            </Modal>
        )
    }


    if (modalStep === 2) {
        return (
            <Modal 
                isVisible={isOpenedModal} 
                setIsVisible={handleCloseModal} 
                isOverlay 
                className={styles.customModal} 
                isCloseButton={true} 
                title={
                     <div className={styles.customModal2_title}>
                        <button className={styles.customModal2_title_btn} onClick={() => setModalStep(1)}>
                            <Svg name="arrowLeftFull" color="black"/>
                        </button>
                        <Text color="var(--blackText)" size={22}>Пожаловаться</Text>
                    </div> 
                }
            >
                <div className={styles.customModal2_content}>
                    <div className={styles.customModal2_content_text}>
                        <Text size={18}>Хотите что-то добавить?</Text>
                        <Text lineHeight={20} size={14}>Добавьте информацию, которая поможет нам разобраться в проблеме. Не включайте в жалобу личную информацию и вопросы.</Text>

                        <form  
                            action={(formData: FormData) => handleSendReport(formData)} 
                            className={styles.customModal2_content_form}
                        >
                            <textarea 
                                className={styles.customModal2_content_areaText}
                                placeholder="Добавьте сюда дополнительную информацию…"
                                name="reportText"   
                            />
                            <button 
                                className={styles.customModal2_content_btn} 
                                disabled={selectedReportId ? false : true} 
                                type="submit"
                            >
                                Пожаловаться
                            </button>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }


}