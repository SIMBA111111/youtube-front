'use client'

import { FC, useRef } from "react";
import { IChannel } from "@/entities/channels/modal/types"
import { ChannelCard } from "@/entities/channels/ui"
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";
import { useInfitityScroll } from "@/shared/hooks/useInfitityScroll";
import { Spinner } from "@/shared/ui";
import styles from "./styles.module.scss";

interface IMySubChannels {
  userId: string
  jwt: string
}

export const MySubChannels: FC<IMySubChannels> = ({
  jwt,
  userId
}) => {
  const loadingRef = useRef<HTMLElement>(null)

  const fetchHistoryVideosData = async ({
      offset,
      limit
  }: {
      offset: number,
      limit: number
  }) => {
      const res = await getMySubsChannels(userId)
      return res?.channels || []
  }

  const {
      data,
      hasMore,
      isLoading,
      refreshData
  } = useInfitityScroll<IChannel, any>({
      paginationStep: 5,
      filter: '',
      triggerRef: loadingRef,
      fetchData: fetchHistoryVideosData
  })

  return (
    <>
      <div className={styles.channelList}>
        {data.map((channel: IChannel) => (
          <ChannelCard 
            id={channel.id} 
            name={channel.name} 
            username={channel.username} 
            avatarUrl={channel.avatar_url} 
            description={channel.description} 
            subscribersCount={channel.subscribers_count} 
            notificationSetting={channel.notification_settings} 
            meId={userId}
            links={[]}
          />
        ))}
      </div>

      <div ref={loadingRef} style={{ height: "100px", margin: "20px" }}>
          {isLoading && (
              <div className={styles.spinner}>
                  <Spinner />
              </div>
          )}
      </div>
    </>
    )
}