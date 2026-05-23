import { FC } from "react"
import { useRouter } from "next/navigation"
import { Popover } from "../.."
import { Text } from "@/shared/ui/Text"
import { AUTH_STAGES } from "@/shared/constants/authStages"

import styles from './styles.module.scss'

interface ICreateCommentUnauthPopover {
    isOpen: boolean
    onClose: () => void
}

export const LikeUnauthPopover: FC<ICreateCommentUnauthPopover> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter()

    return (
        <Popover isOpen={isOpen} onClose={onClose} offset={30}>
            <div className={styles.container}>
                <Text size={20} weight={700}>Понравилось видео?</Text>
                <Text size={14} weight={500} color={'var(--descriptionText)'}>Войдите в аккаунт, чтобы поставить отметку.</Text>
                <button onClick={() => router.push(`/auth?stage=${AUTH_STAGES.LOGIN}`)} className={styles.btn}>Войти</button>
            </div>
        </Popover>
    )
}