import { cookies } from "next/headers";
import { Text } from "@/shared/ui";
import { getLikedPlaylists } from "@/shared/api/playlists/getLikedPlaylists";
import { Playlist } from "@/entities/playlist/ui";
import { UnauthorizedWidget } from "@/widgets/UnauthorizedWidget/UnauthorizedWidget";
import { getChannelData } from "@/shared/utils/getChannelData";
import styles from "./styles.module.scss";
import { IPlaylistEntity } from "@/entities/playlist/model/types";


export default async function Playlists() {
  const cookie = await cookies()
  const myChannelData = await getChannelData(cookie)

  let jwt
  let playlists

  if(myChannelData) {
    jwt = cookie.get('jwt')?.value || ''
    playlists = await getLikedPlaylists(myChannelData.id, jwt)
  } else {
    return (
      <UnauthorizedWidget svgName="playlist" title="Чтобы посмотреть сохранённые плейлисты, войдите в аккаунт." />
    )
  }

  if (!playlists || !playlists.data) {
    return (
      <div>
        Нет данных...
      </div>
    )
  }

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>Плейлисты</Text>
      <div className={styles.plalist_list}>
        {
          playlists.data.map((pl: IPlaylistEntity) => 
            <div className={styles.plalist_list_item}>
              <Playlist
                playlist={pl}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}
