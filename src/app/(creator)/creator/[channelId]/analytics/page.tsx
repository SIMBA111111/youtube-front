// app/creator/channel/page.tsx
import { cookies } from "next/headers";
import { ChannelAnalytics } from "@/widgets/creator";
import { getChannelData } from "@/shared/utils/getChannelData";
import styles from "./styles.module.scss";

export default async function CreatorChannel() {
  const cookieStore = await cookies()
  const userData = await getChannelData(cookieStore)

  if (!userData) {
    return (
      <div>
        Нет юзера :
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <h1>Аналитика</h1>
      <div className={styles.page}>
        <ChannelAnalytics userId={userData.id}/>
      </div>
    </div>
  );
}