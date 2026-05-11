"use client";

import { useState } from "react";
import { Popover, Svg, Text } from "@/shared/ui";
import { handleSubscribe } from "../lib/handleSubscribe";
import { handleNotificationSettings } from "../lib/handleNotificationSettings";
import styles from "./styles.module.scss";

export enum notificationSettings {
  All = "ALL",
  NOONE = "NOONE",
}

interface ISubscribeButton {
  isSubscribed: boolean;
  notificationSetting: boolean;
  meId: string;
  channelId: string;
}

export const SubscribeButton: React.FC<ISubscribeButton> = ({
  isSubscribed,
  notificationSetting,
  meId,
  channelId,
}) => {
  const [popoverIsVisible, setPopoverIsVisible] = useState<boolean>(false);
  const [isSub, setIsSub] = useState<boolean>(isSubscribed);
  const [isNotifSettings, setIsnotifSettings] =
    useState<boolean>(notificationSetting);

  if (channelId === meId) {
    return (
      <button className={styles.subscribeButton}>
        <Text
          className={styles.subscribeButton_btn_text}
          color="var(--whiteText)"
        >
          Ваше видео
        </Text>
      </button>
    );
  }

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
            offset={20}
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
          handleSubscribe(channelId, meId, isSub, setIsSub, setPopoverIsVisible)
        }
      >
        <Text className={styles.unsibscribe_text} color="var(--whiteText)">
          Подписаться
        </Text>
      </button>
    );
  }
};
