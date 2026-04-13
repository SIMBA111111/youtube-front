'use client'

import { ILink } from "@/entities/channels/modal/types"

interface IEllipsisChannelText {
        name?: string
        description?: string
        subscribersCount?: number
        videosCount?: number
        viewersCount?: number
        country?: string
        createdAt?: string
        links: ILink[]
}

export const EllipsisChannelText: React.FC<IEllipsisChannelText> = ({
    name,
    description,
    subscribersCount,
    videosCount,
    viewersCount,
    country,
    createdAt,
    links
}) => {
    const 


}