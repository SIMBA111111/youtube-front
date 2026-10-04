'use client'

import { FC, useRef } from "react";
import { IChannelEntity } from "@/entities/channels/model/types"
import { ChannelCard } from "@/entities/channels/ui"
import { getMySubsChannels } from "@/shared/api/channels/getMySubsChannels";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
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
      const res = await getMySubsChannels(userId, offset, limit)

      if (!res || !res.data || res.error) {
        return []
      }

      return res?.data || []
  }

  const {
      data,
      hasMore,
      isLoading,
      refreshData
  } = useInfinityScroll<IChannelEntity, any>({
      paginationStep: 5,
      filter: '',
      triggerRef: loadingRef,
      fetchData: fetchHistoryVideosData
  })

  return (
    <>
      <div className={styles.channelList}>
        {data.map((channel: IChannelEntity) => (
          <ChannelCard 
            id={channel.id} 
            name={channel.name} 
            username={channel.username} 
            avatarUrl={channel.avatarUrl} 
            description={channel.description} 
            subscribersCount={channel.subscribersCount} 
            notificationSetting={channel.notificationSetting} 
            meId={userId}
            links={[]}
          />
        ))}
      </div>

      <div ref={loadingRef} style={{ height: "50px", margin: "20px" }}>
          {isLoading && (
              <div className={styles.spinner}>
                  <Spinner />
              </div>
          )}
      </div>
    </>
    )
}