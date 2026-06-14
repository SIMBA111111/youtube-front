// app/creator/channel/page.tsx
import { cookies } from "next/headers";
import styles from "./styles.module.scss";
import { EditingVideo } from "@/widgets/creator/EditingVideo";

export default async function VideoEditing({
  params,
}: {
  params: Promise<{ videoId: string, videoHash: string }>
}) {
  const cookieStore = await cookies()
  const { videoId, videoHash } = await params
  const userData = JSON.parse(cookieStore.get('channelData')?.value || '{}')
  const jwt = cookieStore.get('jwt')?.value || ''

  return (
    <div className={styles.page}>
      <div className={styles.page}>
        <EditingVideo videoHash={videoHash} videoId={videoId}/>
      </div>
    </div>
  );
}