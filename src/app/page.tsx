import { getVideos } from "@/shared/api/video/getVideoList";
import styles from "./styles.module.scss";
import { VideoList } from "@/widgets";

export default async function MainPage() {

  const videos = await getVideos()

  return (
    <VideoList videoList={videos}/>
  );
}
