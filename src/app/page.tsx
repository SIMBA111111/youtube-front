import { getVideos } from "@/shared/api/video/getVideoList";
import styles from "./styles.module.scss";
import { VideoList } from "@/widgets";
import { getTags } from "@/shared/api/tags/getTags";

export default async function MainPage() {

  const videos = await getVideos()
  const tags = await getTags()

  return (
    <VideoList tags={tags} videoList={videos}/>
  );
}
