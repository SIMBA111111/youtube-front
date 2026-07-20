import { cookies } from "next/headers";

import { getChannelInfoByUsername } from "@/shared/api/channels/getChannelInfo";
import {  Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import { ChannelTabs } from "@/widgets/ChannelTabs";
import { EllipsisChannelText } from "@/features/channelDescriptionText/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { getPostsByUsername } from "@/shared/api/posts/getPostsByChannelHash";
import { getPlaylistsByUsername } from "@/shared/api/playlists/getPlaylistsByChannelHash";
import { SubscribeButton } from "@/features";
import { getChannelData } from "@/shared/utils/getChannelData";

import styles from "./styles.module.scss";


export default async function ChannelMain ({
  params,  // ← params, не searchParams
}: {
  params: Promise<{ username: string }>
}) {
    const { username: channelUsername} = await params

    const cookie = await cookies()
    const myChannelData = await getChannelData(cookie)

    const channelInfo = await getChannelInfoByUsername(channelUsername, myChannelData.id)
    
    const [ videoList, shortVideoList, playlists, postList ] = await Promise.all([
        getVideoListByChannelUsername(channelUsername, false),
        getVideoListByChannelUsername(channelUsername, true),
        getPlaylistsByUsername(channelUsername),
        getPostsByUsername(channelUsername)
    ])
    
    return (
        <div className={styles.pageContainer}>
            <img src={channelInfo?.channel.banner_url ?? 'defaultImages/defaultAvatar.png'} alt="banner" className={styles.channelBanner}/>
            <div className={styles.channel}>
                <img src={channelInfo?.channel.avatar_url ?? 'defaultImages/defaultAvatar.png'} alt="avatar" className={styles.channelAvatar}/>
                <div className={styles.channelInfo}>
                    <Text size={36} weight={600}>{channelInfo?.channel.name}</Text>
                    <div className={styles.channelInfo_description}>
                        <Text color="var(--blackText)">{channelInfo?.channel.username}</Text>
                        <Text color="var(--gray)">{formatViews(channelInfo?.channel.subscribers_count ?? 0)} подписчиков</Text>
                        <Text color="var(--gray)">{formatViews(channelInfo?.channel.videos_count ?? 0)} видео</Text>
                    </div>
                    <EllipsisChannelText
                        id={channelInfo.channel.id}
                        country={channelInfo.channel.country}
                        description={channelInfo.channel.description || ''}
                        email={channelInfo.channel.email}
                        links={channelInfo.channel.links}
                        name={channelInfo.channel.name}
                        subscribersCount={channelInfo.channel.subscribers_count}
                        videosCount={channelInfo.channel.videos_count}
                        viewersCount={channelInfo.channel.viewers_count}
                        createdAt={channelInfo.channel.created_at}
                    />
                    <div className={styles.channelInfo_btns}>
                        <SubscribeButton 
                            channelId={channelInfo.channel.id} 
                            isSubscribed={channelInfo.subData ? true : false} 
                            meId={myChannelData.id} 
                            notificationSetting={channelInfo.subData?.notification_settings}
                        />
                    </div>
                </div>
            </div>
            <ChannelTabs 
                videoList={videoList.videos} 
                channelUsername={channelUsername} 
                shortVideoList={shortVideoList?.videos || []} 
                communityPosts={postList.posts} 
                playlists={playlists.playlists}
            />
        </div>
    )
}