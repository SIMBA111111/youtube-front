import { cookies } from "next/headers";

import { getMe } from "@/shared/api/me/getMe";
import { getMyViewsHistory } from "@/shared/api/me/getMyViewsHistory";
import { getMyLikedPlaylists } from "@/shared/api/me/getMyLikedPlaylists";
import { Text } from "@/shared/ui";
import { MyChannelActions } from "@/widgets/myChannelActions";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import { getChannelData } from "@/shared/utils/getChannelData";

import styles from "./styles.module.scss";


export default async function Subscriptions() {
  const cookie = await cookies();
  const myChannelData = await getChannelData(cookie)

  let jwt
  let me
  let vieweredVideoList
  let likedPlaylists
  let likedVideoList

  if (cookie.get("channelData")) {
    const channelData = JSON.parse(cookie.get("channelData")?.value || "") || {};
    jwt = cookie.get("jwt")?.value || '' 
    me = await getMe(jwt, myChannelData.id);
    vieweredVideoList = await getMyViewsHistory(jwt, myChannelData.id, 0, 20);
    likedPlaylists = await getMyLikedPlaylists(jwt, myChannelData.id, 0, 20);
    likedVideoList = await getLikedVideos(myChannelData.id, jwt, 0, 20);
  } else {
    return(
      <UnauthorizedWidget svgName="doublePlayer" title="Здесь вы увидите сохраненные видео и те, которые вам понравились."/>
    )
  }

  return (
    <div className={styles.mainPage__container}>
      <div className={styles.myChannel}>
        <img
          src={me.meInfo.avatar_url ?? "/defaultImages/defaultAvatar.png"}
          alt="avatarUrl"
          className={styles.myChannel_avatar}
        />
        <div className={styles.myChannel_info}>
          <Text size={36} weight={600}>
            {me.meInfo.name}
          </Text>
          <div>
            <a
              href={`/channel/${me.id}`}
              className={styles.myChannel_info_username}
            >
              {me.meInfo.username} • Перейти на канал
            </a>
          </div>
        </div>
      </div>
      <MyChannelActions
        items={vieweredVideoList.viewsHistory}
        title="История"
        link="/feed/history"
      />
      <MyChannelActions
        items={likedPlaylists.likedPlaylists}
        title="Плейлисты"
        link="/feed/playlists"
      />
      <MyChannelActions
        items={likedVideoList.likedVideos}
        title="Понравившиеся"
        link="/feed/liked"
      />
    </div>
  );
}
