import { Dispatch, SetStateAction } from "react"
import styles from "./styles.module.scss";
import { Text } from "@/shared/ui";

interface IVideoTags {
    id: string
    name: string
    setActiveTag: Dispatch<SetStateAction<string>>
    activeTag: string
}

export const VideoTags: React.FC<IVideoTags> = ({
    id,
    name,
    setActiveTag,
    activeTag = false,
}) => {
        const isActive = activeTag === id

        return <div onClick={() => setActiveTag(id)} className={`${styles.tag} ${isActive ? styles.tag_active : ''}`}>
                    <Text color={isActive ? 'var(--whiteText)' : ''}>{name}</Text>
                </div>
}