import { cookies } from "next/headers";

import { getVideos } from "@/shared/api/video/getVideoList";
import { VideoList } from "@/widgets";
import { getTags } from "@/shared/api/tags/getTags";

import styles from "./styles.module.scss";


export default async function MainPage() {

  const jwt = await (await cookies()).get('jwt')

  const videos = await getVideos(jwt?.value)
  const tags = await getTags()

  return (
    <div className={styles.page}>
      <VideoList tags={tags.tags} initVideos={videos.videos} jwt={jwt?.value || ''}/>
    </div>
  );
}
