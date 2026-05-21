import { cookies } from "next/headers";

import { getVideoListBySubs } from "@/shared/api/video/getVideoListBySubs";
import { useDeviceIsMobile } from "@/shared/hooks/getDeviceIsMobile";
import { Subs } from "@/widgets";
import { getMe } from "@/shared/api/me/getMe";
import { getMyViewsHistory } from "@/shared/api/me/getMyViewsHistory";
import { getMyLikedPlaylists } from "@/shared/api/me/getMyLikedPlaylists";
import { getMyLikedVideoList } from "@/shared/api/me/getMyLikedVideoList";
import { Text } from "@/shared/ui";
import { MyChannelActions } from "@/widgets/myChannelActions";
import { getLikedVideos } from "@/shared/api/video/getLikedVideos";

import styles from "./styles.module.scss";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";


export default async function Subscriptions() {
  const cookie = await cookies();

  let jwt
  let meId
  let me
  let vieweredVideoList
  let likedPlaylists
  let likedVideoList

  if (cookie.get("channelData")) {
    const channelData = JSON.parse(cookie.get("channelData")?.value || "") || {};
    meId = channelData.id || "";
    jwt = cookie.get("jwt")?.value 
    me = await getMe(jwt, meId);
    vieweredVideoList = await getMyViewsHistory(jwt, meId, 0, 20);
    likedPlaylists = await getMyLikedPlaylists(jwt, meId, 0, 20);
    likedVideoList = await getLikedVideos(meId, jwt, 0, 20);
  } else {
    return(
      <UnauthorizedWidget svgName="doublePlayer" title="Здесь вы увидите сохраненные видео и те, которые вам понравились."/>
    )
  }





  console.log('me = ', me);
  

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
