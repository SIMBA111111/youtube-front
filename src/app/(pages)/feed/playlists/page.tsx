import { Text } from "@/shared/ui";
import { getLikedPlaylists } from "@/shared/api/playlists/getLikedPlaylists";
import { Playlist } from "@/entities/playlist/ui";
import styles from "./styles.module.scss";

export default async function Playlists() {

  const playlists = await getLikedPlaylists()

  return (
    <div className={styles.mainPage}>
      <Text size={36} weight={600}>Плейлисты</Text>
      <div className={styles.plalist_list}>
        {
          playlists.map((pl) => 
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
