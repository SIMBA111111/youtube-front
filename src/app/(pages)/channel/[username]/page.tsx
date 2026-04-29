import { getChannelInfoByUsername } from "@/shared/api/channels/getChannelInfo";
import {  Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import { ChannelTabs } from "@/widgets/ChannelTabs";
import { EllipsisChannelText } from "@/features/channelDescriptionText/ui";
import { getVideoListByChannelUsername } from "@/shared/api/video/getVideoListByChannelUsername";
import { getShortVideoListByUsername } from "@/shared/api/video/getShortVideoListByChannelHash";
import { getPostsByUsername } from "@/shared/api/posts/getPostsByChannelHash";
import { getPlaylistsByUsername } from "@/shared/api/playlists/getPlaylistsByChannelHash";
import styles from "./styles.module.scss";

export default async function ChannelMain ({
  params,  // ← params, не searchParams
}: {
  params: Promise<{ username: string }>
}) {
    const { username: channelUsername} = await params
    
    const channelInfo = await getChannelInfoByUsername(channelUsername)
    const videoList = await getVideoListByChannelUsername(channelUsername)
    const shortVideoList = await getShortVideoListByUsername(channelUsername)
    const playlists = await getPlaylistsByUsername(channelUsername)
    const postList = await getPostsByUsername(channelUsername)

    // console.log('channelInfo ============= ', channelInfo);
    // console.log('videoList ============= ', videoList);
    // console.log('shortVideoList ============= ', shortVideoList);
    console.log('playlists ============= ', playlists);
    console.log('postList ============= ', postList);
    

    return (
        <div className={styles.pageContainer}>
            <img src={channelInfo?.banner_url ?? 'defaultImages/defaultAvatar.png'} alt="banner" className={styles.channelBanner}/>
            <div className={styles.channel}>
                <img src={channelInfo?.avatar_url ?? 'defaultImages/defaultAvatar.png'} alt="avatar" className={styles.channelAvatar}/>
                <div className={styles.channelInfo}>
                    <Text size={36} weight={600}>{channelInfo?.name}</Text>
                    <div className={styles.channelInfo_description}>
                        <Text color="var(--blackText)">{channelInfo?.username}</Text>
                        <Text color="var(--gray)">{formatViews(channelInfo?.subscribers_count ?? 0)} подписчиков</Text>
                        <Text color="var(--gray)">{formatViews(channelInfo?.videos_count ?? 0)} видео</Text>
                    </div>
                    <EllipsisChannelText
                        id={channelInfo.id}
                        country={channelInfo.country}
                        description={channelInfo.description || ''}
                        email={channelInfo.email}
                        links={channelInfo.links}
                        name={channelInfo.name}
                        subscribersCount={channelInfo.subscribers_count}
                        videosCount={channelInfo.videos_count}
                        viewersCount={channelInfo.viewers_count}
                        createdAt={channelInfo.created_at}
                    />
                    <div className={styles.channelInfo_btns}>
                        <button className={styles.channelInfo_btns_subscribe}><Text>Подписаться</Text></button>
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