import { cookies } from "next/headers";

import { getChannelInfoByUsername } from "@/shared/api/channels/getChannelInfo";
import {  Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import { ChannelTabs } from "@/widgets/ChannelTabs";
import { EllipsisChannelText } from "@/features/channelDescriptionText/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { getPlaylistsByUsername } from "@/shared/api/playlists/getPlaylistsByChannelHash";
import { SubscribeButton } from "@/features";
import { getChannelData } from "@/shared/utils/getChannelData";

import styles from "./styles.module.scss";
import { getPlaylistById } from "@/shared/api/playlists/getPlaylistById";


export default async function ChannelMain ({
  params,  // ← params, не searchParams
}: {
  params: Promise<{ username: string }>
}) {
    const { username } = await params

    const cookie = await cookies()
    const myChannelData = await getChannelData(cookie)

    const channelInfo = await getChannelInfoByUsername(username, myChannelData?.id || '')
    
    if (!channelInfo || !channelInfo.data || channelInfo.error) {
        return (
            <div>
                Ошибка...
            </div>
        )
    }

    const [ 
        // shortVideoList, 
        playlists
    ] = await Promise.all([
    //     getVideoListByChannelUsername(channelUsername, false),
        // getVideoListByChannelUsername(username, true),
        getPlaylistsByUsername(username),
    ])

    return (
        <div className={styles.pageContainer__container}>
            <div className={styles.pageContainer__wrapper}>
                <img src={channelInfo?.data.channelData.bannerUrl ?? 'defaultImages/defaultAvatar.png'} alt="banner" className={styles.channelBanner}/>
                <div className={styles.channel}>
                    <img src={channelInfo?.data.channelData.avatarUrl ?? 'defaultImages/defaultAvatar.png'} alt="avatar" className={styles.channelAvatar}/>
                    <div className={styles.channelInfo}>
                        <Text size={36} weight={600}>{channelInfo?.data.channelData.name}</Text>
                        <div className={styles.channelInfo_description}>
                            <Text color="var(--blackText)">{channelInfo?.data.channelData.username}</Text>
                            <Text color="var(--gray)">{formatViews(channelInfo?.data.channelData.subscribersCount ?? 0)} подписчиков</Text>
                            <Text color="var(--gray)">{formatViews(channelInfo?.data.channelData.videosCount ?? 0)} видео</Text>
                        </div>
                        <EllipsisChannelText
                            id={channelInfo.data.channelData.id}
                            country={channelInfo.data.channelData.country || ''}
                            description={channelInfo.data.channelData.description || ''}
                            email={channelInfo.data.channelData.email}
                            links={channelInfo.data.channelData.links || []}
                            name={channelInfo.data.channelData.name}
                            subscribersCount={channelInfo.data.channelData.subscribersCount}
                            videosCount={channelInfo.data.channelData.videosCount}
                            viewersCount={channelInfo.data.channelData.viewersCount}
                            createdAt={channelInfo.data.channelData.createdAt}
                        />
                        <div className={styles.channelInfo_btns}>
                            <SubscribeButton 
                                channelId={channelInfo.data.channelData.id} 
                                isSubscribed={!channelInfo.data.subscriptionData?.deleted} 
                                meId={myChannelData?.id || ''} 
                                notificationSetting={!!channelInfo.data.subscriptionData?.notificationSettings}
                            />
                        </div>
                    </div>
                </div>
                <ChannelTabs 
                    // videoList={videoList.videos} 
                    channelUsername={username} 
                    // videoList={shortVideoList?.data || []} 
                    playlists={playlists?.data || []} 
                />
            </div>
        </div>
    )
}