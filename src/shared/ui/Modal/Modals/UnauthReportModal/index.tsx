'use client'

import { Text } from "@/shared/ui/Text"
import { Modal } from "../.."
import { FC } from "react"
import { AUTH_STAGES } from "@/shared/constants/authStages"
import { useRouter } from "next/navigation"
import styles from './styles.module.scss'


interface IUnauthReportModal {
    isVisibleModal: boolean
    setIsVisibleModal: (newValue: boolean) => void
}

export const UnauthReportModal: FC<IUnauthReportModal> = ({
    isVisibleModal,
    setIsVisibleModal
}) => {
    const router = useRouter()
    
    return (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal} className={styles.modal} isOverlay title={<Text size={20} weight={700}>Хотите пожаловаться?</Text>}>
            <div className={styles.container}>
                <Text size={14} lineHeight={20} color={'var(--descriptionText)'}>Чтобы сообщить о видео, которое, на ваш взгляд, нарушает правила YouTube, войдите в аккаунт.</Text>
                <div className={styles.btns}>
                    <button onClick={() => setIsVisibleModal(false)} className={styles.btn1}>Отмена</button>
                    <button onClick={() => router.push(`/auth?stage=${AUTH_STAGES.LOGIN}`)} className={styles.btn2}>Войти</button>
                </div>
            </div>
        </Modal>
    )
}