"use client"

import { useEffect, useRef, useState } from "react"

import { BackgroundFon, Modal, Popover, Searcher, Svg, Text } from "@/shared/ui"

import { NotifCard } from "@/entities/notifs/ui/card/notifCard"
import { INotificationItem } from "@/entities/notifs/modal/types"
import { getNotifs } from "@/shared/api/notifications/getNotifs"
import Link from "next/link"

import styles from './styles.module.scss'


export const Notifications = ({userId} : {userId: string}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [notifs, setNotifs] = useState<INotificationItem[]>([])
  const [isExistNewNotif, setIsExistNewNotif] = useState<boolean>(true)
  const eventSourceRef = useRef<EventSource>(null)

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          eventSourceRef.current = new EventSource(`http://localhost:8080/api/event/notif-event/${userId}`);

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

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const notifsData = await getNotifs(userId)

        setNotifs(notifsData.notifs)
      } catch (error) {
        console.error('Ошибка при загрузке уведомлений:', error)
      }
    }
    fetchNotifs()
  }, [])

  const handleOpenPopover = () => {
    setIsOpenModal(true)
    setIsExistNewNotif(false)
  }

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notifications} onClick={handleOpenPopover}>
        <BackgroundFon bacgroundColor=''>
          <div className={styles.bellContainer}>
            <div className={isExistNewNotif ? styles.pointer : ''} />
            <Svg name='bell'/>
          </div>
          <div className={styles.notificationTooltip}>
            <Text size={14} color='var(--whiteText)' weight={300}>Уведомления</Text>
          </div>
        </BackgroundFon>
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

          <div className={styles.notifModal__body}>
            {notifs.length > 0 ? (
              notifs.map((notif, index) => (
                <NotifCard key={index} notif={notif}/>
              ))
            ) : (
              <Text size={16} color='var(--grayText)'>Нет уведомлений</Text>
            )}
          </div>
        </div>
      </Popover>
    </div>
  )   
}