import { cookies } from "next/headers";
import { Text } from "@/shared/ui";
import { getLikedPlaylists } from "@/shared/api/playlists/getLikedPlaylists";
import { IPlaylist, Playlist } from "@/entities/playlist/ui";
import styles from "./styles.module.scss";

export default async function Playlists() {
  const cookie = await cookies()

  let meId
  let jwt

  if(cookie.get('channelData')) {
      meId = JSON.parse(cookie.get('channelData')?.value || '').id
      jwt = cookie.get('jwt')?.value
  }

  const playlists = await getLikedPlaylists(meId, jwt)

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>Плейлисты</Text>
      <div className={styles.plalist_list}>
        {
          playlists.likedPlaylists.map((pl: IPlaylist) => 
            <div className={styles.plalist_list_item}>
              <Playlist
                channel={pl.channel}
                createdAt={pl.createdAt}
                playlistName={pl.playlistName}
                playlistPreview={pl.playlistPreview}
                updatedAt={pl.updatedAt}
                videos={pl.videos}
              />
            </div>
            
          )
        }
      </div>
      
    </div>
  );
}
