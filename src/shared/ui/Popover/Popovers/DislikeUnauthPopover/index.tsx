import { FC } from "react"
import { Popover } from "../.."
import { Text } from "@/shared/ui/Text"
import { useRouter } from "next/navigation"
import { AUTH_STAGES } from "@/shared/constants/authStages"

import styles from './styles.module.scss'

interface ICreateCommentUnauthPopover {
    isOpen: boolean
    onClose: () => void
}

export const DislikeUnauthPopover: FC<ICreateCommentUnauthPopover> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter()

    return (
        <Popover isOpen={isOpen} onClose={onClose} offset={30}>
            <div className={styles.container}>
                <Text size={20} weight={700}>Не понравилось?</Text>
                <Text size={14} color={'var(--descriptionText)'}>Войдите в аккаунт, чтобы поставить отметку.</Text>
                <button onClick={() => router.push(`/auth?stage=${AUTH_STAGES.LOGIN}`)} className={styles.btn}>Войти</button>
            </div>
        </Popover>
    )
}