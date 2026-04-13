'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { useToast } from "@/app/providers/toastProvider";

import styles from "./styles.module.scss";


interface IChannelMain {
    id: string
    name: string
    description: string
    email: string
    subscribersCount: number
    videosCount: number
    viewersCount: number
    country: string
    createdAt?: string
    links: ILink[]
}

export const ChannelMain: React.FC<IChannelMain> = ({
    id,
    name,
    description,
    email,
    subscribersCount,
    videosCount,
    viewersCount,
    country,
    createdAt,
    links
}) => {

    return (
        <div>
         
        </div>
    )
}