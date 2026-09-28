import { Text } from "@/shared/ui";
import { Liked } from "@/widgets/feed/liked";
import { cookies } from "next/headers";
import { getTags } from "@/shared/api/tags/getTags";
import { LIKED_TAGS } from "@/shared/constants/tags";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import { getChannelData } from "@/shared/utils/getChannelData";
import { ITagEntity } from "@/entities/videoTags/model";
import styles from "./styles.module.scss";


export default async function LikedPage() {

  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  let jwt
  let tags
  let filteredTags

  jwt = cookie.get('jwt')?.value
  tags = await getTags(jwt)

  if(tags && tags.data)
    filteredTags = tags.data.filter((t: ITagEntity) => LIKED_TAGS.find(tag => tag.name === t.name))


  if (!myChannelData || !jwt || !filteredTags) {
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
