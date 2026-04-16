import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { Subs } from "@/widgets";
import styles from "./styles.module.scss";
import { getMe } from "@/shared/api/me/getMe";
import { getMyViewersHistory } from "@/shared/api/me/getMyViewersHistory";
import { getMyLikedPlaylists } from "@/shared/api/me/getMyLikedPlaylists";
import { getMyLikedVideoList } from "@/shared/api/me/getMyLikedVideoList";
import { Text } from "@/shared/ui";
import { MyChannelActions } from "@/widgets/myChannelActions";

export default async function Subscriptions() {

  const me = await getMe()
  const vieweredVideoList = await getMyViewersHistory()
  const likedPlaylists = await getMyLikedPlaylists()
  const likedVideoList = await getMyLikedVideoList()

  return (
    <div className={styles.mainPage__container}>
      <div className={styles.myChannel}>
        <img src={me.avatarUrl} alt="avatarUrl" className={styles.myChannel_avatar}/>
        <div className={styles.myChannel_info}>
          <Text size={36} weight={600}>{me.name}</Text>
          <div>
          <a href={`/channel/${me.id}`} className={styles.myChannel_info_username}>{me.username} • Перейти на канал</a>
          </div>
        </div>
      </div>
      <MyChannelActions items={vieweredVideoList} title="История" link="/feed/history"/>
      <MyChannelActions items={likedPlaylists} title="Плейлисты" link="/feed/playlists"/>
      <MyChannelActions items={likedVideoList} title="Понравившиеся" link="/feed/liked"/>
    </div>
  );
}
