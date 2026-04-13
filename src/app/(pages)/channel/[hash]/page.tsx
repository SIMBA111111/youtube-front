import { getChannelInfo } from "@/shared/api/channels/getChannelInfo";
import {  Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import { ChannelTabs } from "@/widgets/ChannelTabs";
import { EllipsisChannelText } from "@/features/channelDescriptionText/ui";
import styles from "./styles.module.scss";
import { getVideoListByChannelHash } from "@/shared/api/video/getVideoListByChannelHash";
import { getShortVideoListByChannelHash } from "@/shared/api/video/getShortVideoListByChannelHash";

export default async function ChannelMain ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) {
    const { hash: channelHash} = await searchParams

    const channelInfo = await getChannelInfo(channelHash)
    const videoList = await getVideoListByChannelHash(channelHash)
    const shortVideoList = await getShortVideoListByChannelHash(channelHash)

    return (
        <div className={styles.pageContainer}>
            <img src={channelInfo?.bannerUrl} alt="banner" className={styles.channelBanner}/>
            <div className={styles.channel}>
                <img src={channelInfo?.avatarUrl} alt="banner" className={styles.channelAvatar}/>
                <div className={styles.channelInfo}>
                    <Text size={36} weight={600}>{channelInfo?.name}</Text>
                    <div className={styles.channelInfo_description}>
                        <Text color="var(--blackText)">{channelInfo?.username}</Text>
                        <Text color="var(--gray)">{formatViews(channelInfo?.subscribersCount ?? 0)} подписчиков</Text>
                        <Text color="var(--gray)">{formatViews(channelInfo?.videosCount ?? 0)} видео</Text>
                    </div>
                    <EllipsisChannelText
                        id={channelInfo.id}
                        country={channelInfo.country}
                        description={channelInfo.description}
                        email={channelInfo.email}
                        links={channelInfo.links}
                        name={channelInfo.name}
                        subscribersCount={channelInfo.subscribersCount}
                        videosCount={channelInfo.videosCount}
                        viewersCount={channelInfo.viewersCount}
                        createdAt={channelInfo.createdAt}
                    />
                    <div className={styles.channelInfo_btns}>
                        <button className={styles.channelInfo_btns_subscribe}><Text>Подписаться</Text></button>
                    </div>
                </div>
            </div>
            <ChannelTabs videoList={videoList} channelHash={channelHash} shortVideoList={shortVideoList}/>
        </div>
    )
}