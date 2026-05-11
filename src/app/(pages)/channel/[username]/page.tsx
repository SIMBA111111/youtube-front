import { getChannelInfoByUsername } from "@/shared/api/channels/getChannelInfo";
import {  Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import { ChannelTabs } from "@/widgets/ChannelTabs";
import { EllipsisChannelText } from "@/features/channelDescriptionText/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { getShortVideoListByUsername } from "@/shared/api/video/getShortVideoListByChannelUsername";
import { getPostsByUsername } from "@/shared/api/posts/getPostsByChannelHash";
import { getPlaylistsByUsername } from "@/shared/api/playlists/getPlaylistsByChannelHash";
import styles from "./styles.module.scss";
import { SubscribeButton } from "@/features";
import { cookies } from "next/headers";

export default async function ChannelMain ({
  params,  // ← params, не searchParams
}: {
  params: Promise<{ username: string }>
}) {
    const { username: channelUsername} = await params

    const cookie = await cookies()

    let meId

    if(cookie.get('channelData')) {
        meId = JSON.parse(cookie.get('channelData')?.value || '').id
    }

    console.log('meId = ', meId);
    
    
    const channelInfo = await getChannelInfoByUsername(channelUsername, meId)
    const videoList = await getVideoListByChannelUsername(channelUsername)
    const shortVideoList = await getShortVideoListByUsername(channelUsername)
    const playlists = await getPlaylistsByUsername(channelUsername)
    const postList = await getPostsByUsername(channelUsername)

    console.log('channelInfo ============= ', channelInfo);
    // console.log('videoList ============= ', videoList);
    // console.log('shortVideoList ============= ', shortVideoList);
    // console.log('playlists ============= ', playlists);
    // console.log('postList ============= ', postList);
    

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
                            meId={meId} 
                            notificationSetting={channelInfo.subData.notification_settings}
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