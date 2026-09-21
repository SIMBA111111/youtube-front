"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

import { Popover, Svg, Text } from "@/shared/ui";
import { IChannel } from "@/entities/channels/model/types";
import { SIDEBAR_NAVIGATION, SIDEBAR_YOU, TSIDEBAR_NAVIGATION, TSIDEBAR_YOU } from "@/shared/constants/sidebar";
import { useSidebarStore } from "@/shared/store/sidebar";
import { IThumbnailShortVideo } from "@/entities/thumbnailShortVideo/modal/types";
import { Menu } from "@/shared/ui/Menu";

import styles from "./styles.module.scss";
import { LoginBtn } from "@/features";
import { t } from "i18next";
import { getRegisteredTranslate } from "@/shared/utils/getRegisteredTranslate";

type menuItems = "subs" | "you" | null;

export const DesktopSidebar = ({
  channels,
  randomShortVideo,
}: {
  channels: IChannel[];
  randomShortVideo: IThumbnailShortVideo | null;
}) => {
  const [isOpenedMenu, setIsOpenedMenu] = useState<menuItems>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const isAuth = Cookies.get('channelData') && Cookies.get('jwt') ? true : false 

  const { isOpen } = useSidebarStore();

  const handleMouseEnter = (menuItem: menuItems) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpenedMenu(menuItem);
  };

  const handleMouseLeave = (menuItem: menuItems) => {
    timeoutRef.current = setTimeout(() => {
      setIsOpenedMenu(null);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <>
          <div className={styles.sidebarContainerHidden}>
            <div className={styles.btns}>
              <Link href={"/"} className={styles.btns__item}>
                {pathname === "/" ? (
                  <Svg name="homeActive" />
                ) : (
                  <Svg name="home" />
                )}
                <Text weight={400} size={12}>
                  {getRegisteredTranslate('main', true)}
                </Text>
              </Link>

              <Link
                href={`/shorts/${randomShortVideo?.id}`}
                className={styles.btns__item}
              >
                {pathname === "/shorts" ? (
                  <Svg name="shortsActive" />
                ) : (
                  <Svg name="shorts" />
                )}
                <Text weight={400} size={12}>
                  {getRegisteredTranslate('shorts', true)}
                </Text>
              </Link>

              <Link
                href={"/subscriptions"}
                className={styles.btns__item}
                onMouseEnter={() => handleMouseEnter("subs")}
                onMouseLeave={() => handleMouseLeave("subs")}
              >
                {pathname === "/subscriptions" ? (
                  <Svg name="subscriptionsActvie" />
                ) : (
                  <Svg name="subscriptions" />
                )}
                <Text weight={400} size={12}>
                  {getRegisteredTranslate('subscriptions', true)}
                </Text>
                <Menu
                  delay={150}
                  isOpened={isOpenedMenu === "subs" && isAuth}
                  onClose={() => setIsOpenedMenu(null)}
                  offset={50}
                  className={styles.youMenu_container}
                >
                  <Text
                    size={18}
                    weight={600}
                    className={styles.youMenu_header}
                  >
                  {getRegisteredTranslate('subscriptions', true)}
                  </Text>
                  <div className={styles.youMenu}>
                    {channels?.map((channel: IChannel) => (
                      <Link
                        key={channel.id}
                        href={`/channel/${channel.username}`}
                        className={styles.youMenu_item}
                      >
                        <img
                          src={
                            channel.avatar_url ??
                            "/defaultImages/defaultAvatar.png"
                          }
                          alt=""
                          className={styles.channelAvatar}
                        />
                        <Text weight={400} size={14}>
                          {channel.name}
                        </Text>
                      </Link>
                    ))}
                  </div>
                </Menu>
              </Link>

              <Link
                href={"/you"}
                className={styles.btns__item}
                onMouseEnter={() => handleMouseEnter("you")}
                onMouseLeave={() => handleMouseLeave("you")}
              >
                {pathname === "/you" ? (
                  <Svg name="myAccountActive" />
                ) : (
                  <Svg name="myAccount" />
                )}
                <Text weight={400} size={12}>
                  {getRegisteredTranslate('you', true)}
                </Text>
                <Menu
                  delay={150}
                  isOpened={isOpenedMenu === "you"  && isAuth}
                  onClose={() => setIsOpenedMenu(null)}
                  offset={50}
                  className={styles.youMenu_container}
                >
                  <Text
                    size={18}
                    weight={600}
                    className={styles.youMenu_header}
                  >
                  {getRegisteredTranslate('you', true)}
                  </Text>
                  <div className={styles.youMenu}>
                    <Link
                      href={"/feed/history"}
                      className={styles.youMenu_item}
                    >
                      <Svg name="history" />
                      <Text>{getRegisteredTranslate('you', true)}</Text>
                    </Link>
                    <Link
                      href={"/feed/playlists"}
                      className={styles.youMenu_item}
                    >
                      <Svg name="playlist" />
                      <Text>{getRegisteredTranslate('playlists', true)}</Text>
                    </Link>
                    <Link
                      href={"/feed/see-later"}
                      className={styles.youMenu_item}
                    >
                      <Svg name="clock" />
                      <Text>{getRegisteredTranslate('playlists', true)}Понравившиеся</Text>
                    </Link>
                    <Link href={"/feed/liked"} className={styles.youMenu_item}>
                      <Svg name="like" />
                      <Text>{getRegisteredTranslate('playlists', true)}Понравившиеся</Text>
                    </Link>
                    <Link
                      href={"/feed/my-videos"}
                      className={styles.youMenu_item}
                    >
                      <Svg name="video" />
                      <Text>{getRegisteredTranslate('playlists', true)}Ваши видео</Text>
                    </Link>
                    <Link
                      href={"/feed/dowloaded"}
                      className={styles.youMenu_item}
                    >
                      <Svg name="download" />
                      <Text>{getRegisteredTranslate('playlists', true)}Скачанное</Text>
                    </Link>
                  </div>
                </Menu>
              </Link>
            </div>
          </div>
        </>
      )}

      {isOpen && (
        <>
          <div className={styles.sidebarContainer}>
            <div className={styles.btns__open}>
              <div className={styles.divider}>
                <Link
                  href={"/"}
                  className={
                    pathname === "/"
                      ? styles.btns__item__open_active
                      : styles.btns__item__open
                  }
                >
                  {pathname === "/" ? (
                    <Svg name="homeActive" />
                  ) : (
                    <Svg name="home" />
                  )}
                  <Text weight={400} size={14}>
                    {getRegisteredTranslate('main', true)}
                  </Text>
                </Link>

                <Link
                  href={`/shorts/${randomShortVideo?.id}`}
                  className={
                    pathname === "/shorts"
                      ? styles.btns__item__open_active
                      : styles.btns__item__open
                  }
                >
                  {pathname === "/shorts" ? (
                    <Svg name="shortsActive" />
                  ) : (
                    <Svg name="shorts" />
                  )}
                  <Text weight={400} size={14}>
                    {getRegisteredTranslate('shorts', true)}
                  </Text>
                </Link>
              </div>

              {isAuth ? 
                <>
                  <div className={styles.divider}>
                    <Link href={"/subscriptions"} className={styles.btns__item__open}>
                      <Text>{getRegisteredTranslate('subscriptions', true)}</Text>
                      <Svg name="arrowLeft" size="small" />
                    </Link>
                    {channels.map((channel: IChannel) => (
                      <Link
                        key={channel.id}
                        href={`/channel/${channel.username}`}
                        className={styles.btns__item__open}
                      >
                        <img
                          src={channel.avatar_url}
                          alt=""
                          className={styles.channelAvatar}
                        />
                        <Text weight={400} size={14}>
                          {channel.name}
                        </Text>
                      </Link>
                    ))}
                  </div>

                  <div className={styles.divider}>
                    <Link href={"/you"} className={styles.btns__item__open}>
                      <Text>{getRegisteredTranslate('you', true)}</Text>
                      <Svg name="arrowLeft" size="small" />
                    </Link>

                    {SIDEBAR_YOU.map((el: TSIDEBAR_YOU) => (
                      <Link
                        key={el.id}
                        href={el.href}
                        className={styles.btns__item__open}
                      >
                        <Svg name={el.svgName} />
                        <Text weight={400} size={14}>
                          {getRegisteredTranslate(el.name, true)}
                        </Text>
                      </Link>
                    ))}
                  </div>
                </> :
                (
                  <div className={styles.unauth}>
                    <Text lineHeight={20}>{getRegisteredTranslate("you will be able to like, comment, and subscribe to channels", true)}</Text>
                    <LoginBtn/>
                  </div>
                )
              }

              <div className={styles.divider}>
                <div
                  className={`${styles.navigator} ${styles.btns__item__open}`}
                >
                  <Text>{getRegisteredTranslate('navigator', true)}</Text>
                </div>

                {SIDEBAR_NAVIGATION.map((el: TSIDEBAR_NAVIGATION) => (
                  <Link
                    key={el.id}
                    href={el.href}
                    className={styles.btns__item__open}
                  >
                    <Svg name={el.svgName} />
                    <Text weight={400} size={14}>
                      {getRegisteredTranslate(el.name, true)}
                    </Text>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
