import { Dispatch, SetStateAction } from "react"
import { Text } from "@/shared/ui";
import styles from "./styles.module.scss";

export interface ITag {
    id: string
    name: string
}

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
                    <Text color={isActive ? 'var(--whiteText)' : ''} size={14} weight={500}>{name}</Text>
                </div>
}