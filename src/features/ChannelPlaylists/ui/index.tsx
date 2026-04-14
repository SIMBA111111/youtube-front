'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";

import styles from "./styles.module.scss";
import { IPlaylist } from "@/entities/playlist/ui";


interface IChannelMain {
    playlists: IPlaylist[]
}

export const ChannelPlaylists: React.FC<IChannelMain> = ({
    playlists
}) => {

    return (
        <div>
         
        </div>
    )
}