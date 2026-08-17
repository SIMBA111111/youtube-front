"use client";

import { useState } from "react";
import { Popover, Svg, Text } from "@/shared/ui";
import { handleSubscribe } from "../lib/handleSubscribe";
import { handleNotificationSettings } from "../lib/handleNotificationSettings";
import styles from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_STAGES } from "@/shared/constants/authStages";

export enum notificationSettings {
  All = "ALL",
  NOONE = "NOONE",
}

interface ISubscribeButton {
  isSubscribed: boolean
  notificationSetting: boolean
  meId: string
  channelId: string
  videoId?: string
}

export const SubscribeButton: React.FC<ISubscribeButton> = ({
  isSubscribed,
  notificationSetting,
  meId,
  channelId,
  videoId,
}) => {
  const path = usePathname()
  const [popoverIsVisible, setPopoverIsVisible] = useState<boolean>(false);
  const [isSub, setIsSub] = useState<boolean>(isSubscribed);
  const [isNotifSettings, setIsnotifSettings] = useState<boolean>(notificationSetting);
  const router = useRouter()

  path.includes('/channel/') ? (
    channelId === meId && (
      <div className={styles.myChannelBtns}>
        <a href={`/video/${videoId}/analytics`} className={styles.subscribeButton_btn}>
          <Text>Просмотреть аналитику</Text>
        </a>
        <a href={`/video/${videoId}/edit`} className={styles.subscribeButton_btn}>
          <Text>Изменить видео</Text>
        </a>
      </div>
    )
  ) : (
    channelId === meId && (
      <div className={styles.myChannelBtns}>
        <a href={`/video/${videoId}/analytics`} className={styles.subscribeButton_btn}>
          <Text>Просмотреть аналитику</Text>
        </a>
        <a href={`/video/${videoId}/edit`} className={styles.subscribeButton_btn}>
          <Text>Изменить видео</Text>
        </a>
      </div>
    )
  )


  if (isSub) {
    return (
      <button
        className={styles.subscribeButton_btn}
        onClick={() => setPopoverIsVisible((prev) => !prev)}
      >
        <div className={styles.unsibscribe}>
          <Svg name="bell" />
          <Text className={styles.unsibscribe_text}>Вы подписаны</Text>
          <Svg name="shortArrowDown" />
          <Popover
            isOpen={popoverIsVisible}
            onClose={() => setPopoverIsVisible(false)}
            offset={30}
            className={styles.popover}
          >
            <div className={styles.popover_items}>
              <button
                className={`${styles.popover_item} ${
                  isNotifSettings ? styles.popover_item_active : ""
                }`}
                onClick={() =>
                  handleNotificationSettings(
                    channelId,
                    meId,
                    true,
                    setIsnotifSettings,
                    setPopoverIsVisible
                  )
                }
              >
                <Svg name="bell" />
                <Text weight={400}>Все</Text>
              </button>
              <button
                className={`${styles.popover_item} ${
                  !isNotifSettings ? styles.popover_item_active : ""
                }`}
                onClick={() =>
                  handleNotificationSettings(
                    channelId,
                    meId,
                    false,
                    setIsnotifSettings,
                    setPopoverIsVisible
                  )
                }
              >
                <Svg name="crossedBell" />
                <Text weight={400}>Никакие</Text>
              </button>
              <button
                className={styles.popover_item}
                onClick={() =>
                  handleSubscribe(
                    channelId,
                    meId,
                    isSub,
                    setIsSub,
                    setPopoverIsVisible
                  )
                }
              >
                <Svg name="describe" />
                <Text weight={400}>Отменить подписку</Text>
              </button>
            </div>
          </Popover>
        </div>
      </button>
    );
  } else {
    return (
      <button
        className={styles.subscribeButton_btn2}
        onClick={() =>
          handleSubscribe(channelId, meId, isSub, setIsSub, setPopoverIsVisible, router)
        }
      >
        <Text className={styles.unsibscribe_text} color="var(--whiteText)">
          Подписаться
        </Text>
      </button>
    );
  }
};
