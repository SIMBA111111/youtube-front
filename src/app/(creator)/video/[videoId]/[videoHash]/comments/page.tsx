import { cookies } from "next/headers";
import { Comments } from "@/widgets/creator";
import styles from "./styles.module.scss";


export default async function VideoComments({
  params,
}: {
  params: Promise<{ videoId: string }>
}) {
  const cookieStore = await cookies()
  const userData = JSON.parse(cookieStore.get('channelData')?.value || '{}')
  const { videoId } = await params

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>Комментарии к видео</h1>
      <div className={styles.page}>
        <Comments me={userData} videoId={videoId}/>
      </div>
    </div>
  );
}