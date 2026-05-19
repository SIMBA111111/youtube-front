'use client'

import { useState } from "react"

import { Popover, Svg, Text } from "@/shared/ui"

import styles from "./styles.module.scss";
import { IPlaylist, Playlist } from "@/entities/playlist/ui";


interface IChannelMain {
    playlists: IPlaylist[]
}

export const ChannelPlaylists: React.FC<IChannelMain> = ({
    playlists
}) => {
    const [isOpenedFilter, setIsOpenedFilter] = useState<boolean>(false)

    return (
        <div className={styles.container}>
            <button className={styles.order} onClick={() => setIsOpenedFilter(true)}>
                <Svg name="bell" color="black"/>
                <Text>Упорядочить</Text>
                <Popover 
                    isOpen={isOpenedFilter} 
                    onClose={() => setIsOpenedFilter(false)} 
                    offset={30}
                    className={styles.customPopover}
                >
                    <div className={styles.customPopover_body}>
                        <button className={styles.customPopover_body_item_active} onClick={() => console.log()}>
                            <Text className={styles.customPopover_body_item_text}>Дата добавления: сначала старые</Text>
                        </button>
                        <button className={styles.customPopover_body_item} onClick={() => console.log()}>
                            <Text className={styles.customPopover_body_item_text}>По дате обновления</Text>
                        </button>
                    </div>
                </Popover>
            </button>

            <div className={styles.playlistsContainer}>
                {playlists?.map((playlist, index) => (
                    <Playlist key={index} {...playlist} />
                ))}
            </div>
        </div>
    )
}