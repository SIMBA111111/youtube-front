// app/creator/channel/page.tsx
import { cookies } from "next/headers";
import styles from "./styles.module.scss";

export default async function VideoAnalynics() {
  const cookieStore = await cookies()
  const userData = JSON.parse(cookieStore.get('channelData')?.value || '{}')
  const jwt = cookieStore.get('jwt')?.value || ''

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Аналитика по видео</h1>
      <div className={styles.page}>
      </div>
    </div>
  );
}