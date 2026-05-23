import { FC } from "react"
import { Popover } from "../.."
import { Text } from "@/shared/ui/Text"
import { useRouter } from "next/navigation"
import { AUTH_STAGES } from "@/shared/constants/authStages"

import styles from './styles.module.scss'


interface ICreateCommentUnauthPopover {
    isOpen: boolean
    onClose: () => void
    offset?: number
}

export const CreateCommentUnauthPopover: FC<ICreateCommentUnauthPopover> = ({
    isOpen,
    onClose,
    offset
}) => {
    const router = useRouter()

    return (
        <Popover isOpen={isOpen} onClose={onClose} offset={offset}>
            <div className={styles.container}>
                <Text size={20} weight={700}>Хотите присоединиться к обсуждению?</Text>
                <Text size={14}>Чтобы продолжить, нужно войти в аккаунт.</Text>
                <button onClick={() => router.push(`/auth?stage=${AUTH_STAGES.LOGIN}`)} className={styles.btn}>Войти</button>
            </div>
        </Popover>
    )
}