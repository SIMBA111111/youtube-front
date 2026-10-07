// app/creator/channel/page.tsx
import { cookies } from "next/headers";
import styles from "./styles.module.scss";
import { EditingVideo } from "@/widgets/creator/EditingVideo";

export default async function VideoEditing({
  params,
}: {
  params: Promise<{ videoId: string}>
}) {
  const cookieStore = await cookies()
  const { videoId } = await params

  return (
    <div className={styles.page}>
      <div className={styles.page}>
        <EditingVideo videoId={videoId}/>
      </div>
    </div>
  );
}