import { Svg, Text } from "@/shared/ui";
import styles from "./styles.module.scss";

export const ShortTag = () => {
    console.log('ререндер ShortTag');

    return <div className={styles.shortsTag}>
        <Svg name="shortsRed" />
        <Text size={20}>Shorts</Text>
    </div>
}