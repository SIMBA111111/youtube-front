"use client"

import { useEffect, useRef, useState } from "react"

import { Popover, Searcher, Svg, Text } from "@/shared/ui"

import { NotifCard } from "@/entities/notifs/ui/card/notifCard"
import { getNotifs, INotifExtendInfo } from "@/shared/api/notifications/getNotifs"
import Link from "next/link"

import styles from './styles.module.scss'
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll"


export const Notifications = ({userId} : {userId: string}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [notifs, setNotifs] = useState<INotifExtendInfo[]>([])
  const [isExistNewNotif, setIsExistNewNotif] = useState<boolean>(false)
  const eventSourceRef = useRef<EventSource>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)

  const fetchNotifs = async ({offset, limit}: {offset: number, limit: number}) => {
      const data = await getNotifs(userId, offset, limit)

      if (!data.data || data.error || !data.success) {
        return []
      }

      return data.data
  }

  const {
    data,
    hasMore,
    isLoading,
    refreshData
  } = useInfinityScroll<INotifExtendInfo, any>({
    paginationStep: 10,
    filter: '',
    triggerRef: loadingRef,
    fetchData: fetchNotifs
  })

  useEffect(() => {
    if (isOpenModal) refreshData()
  }, [isOpenModal])

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          eventSourceRef.current = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notif-event/${userId}`);

          eventSourceRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "newVideo") {
              setIsExistNewNotif(true)
            }
          };

          eventSourceRef.current.onerror = (error) => {
            console.error('❌ SSE connection ERROR:', error)

            if (eventSourceRef.current.readyState === EventSource.CLOSED) {
              console.log('🔚 SSE connection closed')
            }
          }

        } catch (error) {
          console.error('EVENT ERRROR: ', error);
          if (eventSourceRef.current) {
            eventSourceRef.current.close()
            eventSourceRef.current = null
          }
        }
      }
    })()

    return (() => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    })
  }, [userId])

  const handleOpenPopover = () => {
    setIsOpenModal(true)
    setIsExistNewNotif(false)
  }

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notifications} onClick={handleOpenPopover}>
        <div className={styles.bellContainer}>
          <div className={isExistNewNotif ? styles.bell : ''} />
          <Svg name='bell'/>
        </div>
        <div className={styles.notificationTooltip}>
          <Text size={14} color='var(--whiteText)' weight={300}>Уведомления</Text>
        </div>
      </div>
      <Popover 
        isOpen={isOpenModal} 
        onClose={() => setIsOpenModal(false)} 
        className={styles.customNotifModal} 
        offset={40} 
        closeOnScroll={false}
      >
        <div className={styles.notifModal}>
          <div className={styles.notifModal__header}>
            <Text weight={400}>Уведомления</Text>
            <Link href={'/account/notifications'} className={styles.settings}>
              <Svg name="settings"/>
              <div className={styles.settingsTooltip}>
                <Text size={14} color='var(--whiteText)' weight={300}>Настройки</Text>
              </div>
            </Link>
          </div>

          {data.length > 0 ? (
            <div className={styles.notifModal__body}>
              {data.map((notif, index) => (
                <NotifCard key={index} notif={notif}/>
              ))}
            </div>
          ) : (
            null
          )}
        </div>

        <div className={styles.byCenter}>
          <div ref={loadingRef} style={{ height: "5px", margin: "1px 0" }}/>

          {!hasMore && (
            <div style={{ textAlign: "center", paddingBottom: "20px" }}>
              Больше нет уведомлений
            </div>
          )}
        </div>
      </Popover>
    </div>
  )   
}