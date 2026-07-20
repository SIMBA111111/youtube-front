import { Text } from "@/shared/ui";
import styles from "./styles.module.scss";
import { Liked } from "@/widgets/feed/liked";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";
import { cookies } from "next/headers";
import { getTags } from "@/shared/api/tags/getTags";
import { LIKED_TAGS } from "@/shared/constants/tags";
import { ITag } from "@/entities/videoTags/ui";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import { getChannelData } from "@/shared/utils/getChannelData";

export default async function LikedPage() {

  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  let jwt
  let tags
  let filteredTags

  if(cookie.get('channelData')) {
    jwt = cookie.get('jwt')?.value
    tags = await getTags()
    filteredTags = tags.tags.filter((t: ITag) => LIKED_TAGS.find((tag: ITag) => tag.name === t.name))
  } else {
    return (
      <UnauthorizedWidget svgName="history" title="Чтобы посмотреть историю просмотра, войдите в аккаунт." />
    )
  }

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>Понравившиеся</Text>
      <Liked tags={filteredTags} meId={myChannelData.id} jwt={jwt}/>
    </div>
  );
}
