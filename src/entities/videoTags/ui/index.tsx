import { Text } from "@/shared/ui";
import { IVideoTag } from "../model";
import styles from "./styles.module.scss";

export const VideoTags: React.FC<IVideoTag> = ({
    id,
    name,
    setActiveTag,
    activeTag = false,
}) => {
        const isActive = activeTag === name

        return (
            <div onClick={() => setActiveTag(name)} className={`${styles.tag} ${isActive ? styles.tag_active : ''}`}>
                <Text color={isActive ? 'var(--whiteText)' : ''} size={14} weight={500}>{name}</Text>
            </div>
        )
}