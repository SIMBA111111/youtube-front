import { useEffect, useState } from "react";
import { IChannel } from "@/entities/channels/modal/types";
import { getChannelInfo } from "@/shared/api/channels/getChannelInfo";
import { EllipsisText, Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import styles from "./styles.module.scss";
import { ChannelTabs } from "@/widgets/ChannelTabs";

export default async function ChannelMain ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
    const { hash: channelHash} = await searchParams

    const channelInfo = await getChannelInfo(channelHash)

    return (
        <div className={styles.pageContainer}>
            <img src={channelInfo?.bannerUrl} alt="banner" className={styles.channelBanner}/>
            <div className={styles.channel}>
                <img src={channelInfo?.avatarUrl} alt="banner" className={styles.channelAvatar}/>
                <div className={styles.channelInfo}>
                    <Text>{channelInfo?.name}</Text>
                    <div className={styles.channelInfo_description}>
                        <Text>{channelInfo?.username}</Text>
                        <Text>{formatViews(channelInfo?.subscribersCount ?? 0)} подписчиков</Text>
                        <Text>{formatViews(channelInfo?.videosCount ?? 0)} видео</Text>
                    </div>
                    <EllipsisText text={channelInfo?.description || ''} symbolCount={200} customHandler={}/>
                    <div className={styles.channelInfo_btns}>
                        <button className={styles.channelInfo_btns_subscribe}><Text>Подписаться</Text></button>
                        <button className={styles.channelInfo_btns_community}><Text>Сообщество</Text></button>
                    </div>
                </div>
            </div>
            <ChannelTabs />
        </div>
    )
}