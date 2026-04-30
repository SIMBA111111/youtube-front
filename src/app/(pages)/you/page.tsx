import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { Subs } from "@/widgets";
import styles from "./styles.module.scss";
import { getMe } from "@/shared/api/me/getMe";
import { getMyViewsHistory } from "@/shared/api/me/getMyViewsHistory";
import { getMyLikedPlaylists } from "@/shared/api/me/getMyLikedPlaylists";
import { getMyLikedVideoList } from "@/shared/api/me/getMyLikedVideoList";
import { Text } from "@/shared/ui";
import { MyChannelActions } from "@/widgets/myChannelActions";
import { cookies } from "next/headers";

export default async function Subscriptions() {

  const cookie = await cookies()

  const jwt = cookie.get('jwt')?.value || ''
  const channelData = JSON.parse(cookie.get('channelData')?.value || '') || {}
  const meId = channelData.id || ''

  const me = await getMe(jwt, meId)
  const vieweredVideoList = await getMyViewsHistory(jwt, meId)
  const likedPlaylists = await getMyLikedPlaylists(jwt, meId)
  const likedVideoList = await getMyLikedVideoList(jwt, meId)

  // console.log('me = ', me);
  // console.log('vieweredVideoList', vieweredVideoList);
  console.log('likedPlaylists = ', likedPlaylists);
  console.log('likedVideoList = ', likedVideoList);
  

  return (
    <div className={styles.mainPage__container}>
      <div className={styles.myChannel}>
        <img src={me.meInfo.avatar_url ?? '/defaultImages/defaultAvatar.png'} alt="avatarUrl" className={styles.myChannel_avatar}/>
        <div className={styles.myChannel_info}>
          <Text size={36} weight={600}>{me.meInfo.name}</Text>
          <div>
          <a href={`/channel/${me.id}`} className={styles.myChannel_info_username}>{me.meInfo.username} • Перейти на канал</a>
          </div>
        </div>
      </div>
      <MyChannelActions items={vieweredVideoList.viewsHistory} title="История" link="/feed/history"/>
      <MyChannelActions items={likedPlaylists.likedPlaylists} title="Плейлисты" link="/feed/playlists"/>
      <MyChannelActions items={likedVideoList.likedVideos} title="Понравившиеся" link="/feed/liked"/>
    </div>
  );
}
