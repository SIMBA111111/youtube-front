import { Svg, Text } from "@/shared/ui";
import styles from "./styles.module.scss";

export const ShortTag = () => {
    return <div className={styles.shortsTag}>
        <Svg name="shortsRed" />
        <Text size={20}>Shorts</Text>
    </div>
}