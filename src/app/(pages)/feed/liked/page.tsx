import { Text } from "@/shared/ui";
import styles from "./styles.module.scss";
import { Liked } from "@/widgets/feed/liked";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";
import { cookies } from "next/headers";
import { getTags } from "@/shared/api/tags/getTags";
import { LIKED_TAGS } from "@/shared/constants/tags";
import { ITag } from "@/entities/videoTags/ui";

export default async function LikedPage() {

  const cookie = await cookies()

  let meId
  let jwt

  if(cookie.get('channelData')) {
      meId = JSON.parse(cookie.get('channelData')?.value || '').id
      jwt = cookie.get('jwt')?.value
  }

  const videos = await getLikedVideos(meId, jwt)
  
  const tags = await getTags()

  const filteredTags = tags.tags.filter((t: ITag) => LIKED_TAGS.find((tag: ITag) => tag.name === t.name))
  
  console.log('videos = ', videos);

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>Понравившиеся</Text>
      <Liked initVideos={videos.likedVideos} tags={filteredTags} meId={meId} jwt={jwt}/>
    </div>
  );
}
