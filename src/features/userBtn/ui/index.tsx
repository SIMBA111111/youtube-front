"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { themes } from "@/shared/constants/themes";
import { languages } from "@/shared/constants/langs";
import { logout } from "@/shared/api/auth/logout";
import { Popover, Svg, Text } from "@/shared/ui";
import { Theme, Themes, useTheme } from "@/app/providers/themeProvider";

import { handleThemeChange } from "../lib/handleThemeChange";
import { IUserBtn } from "../model/types";
import "../../../shared/i18s/i18s";

import styles from "./styles.module.scss";

type SubModalType = "theme" | "language" | null;

export const UserBtn: React.FC<IUserBtn> = ({
  id,
  username,
  channelName,
  avatarUrl,
  jwt
}) => {
  const { theme, setTheme } = useTheme();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [subModal, setSubModal] = useState<SubModalType>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = async (lang: string) => {
    Cookies.set("lang", lang);
    await i18n.changeLanguage(lang);
  };

  const activeLanguage = Cookies.get("lang") || navigator.language.slice(0, 2);

  useEffect(() => {
    const handleStorageChanged = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        setCurrentTheme(e.newValue as Theme)
        setTheme(e.newValue as Theme)
      }
    };
  
    window.addEventListener("storage", handleStorageChanged);
    return () => {
      window.addEventListener("storage", handleStorageChanged);
    }

  }, [])
 
  return (
    <>
      {jwt ? (
        <img
          src={avatarUrl || "defaultImages/defaultAvatar.png"}
          alt=""
          className={styles.headerAvatar}
          onClick={() => setIsOpenModal(true)}
        />
      ) : (
        <button className={styles.settingBtn} onClick={() => setIsOpenModal(true)}>
          <Svg name='verticalEllipsis'/>
        </button>
      )}

      <Popover
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        offset={30}
        className={styles.userModal}
      >
        {/* Основное меню (скрывается когда открыта вложенная модалка) */}
        {!subModal && (
          <>
            {jwt && (
              <div className={styles.channel}>
                <img
                  src={avatarUrl ?? "defaultImages/defaultAvatar.png"}
                  alt=""
                  className={styles.modalAvatar}
                />
                <div className={styles.channelData}>
                  <Text>{channelName}</Text>
                  <Text>{username}</Text>
                  <Link href={"/"}>
                    <Text color="blue">{t('view channel')}</Text>
                  </Link>
                </div>
              </div>
            )}
            <div className={styles.settings}>
              <div
                className={styles.settings__item}
                onClick={() => setSubModal("theme")}
              >
                <Svg name="moon" />
                <Text>{t('theme')}: {t(Themes[currentTheme])}</Text>
                <Svg name="arrowLeft" />
              </div>

              <div
                className={styles.settings__item}
                onClick={() => setSubModal("language")}
              >
                <Svg name="lenguage" />
                <Text>
                  {t('Interface Language')}:{" "}
                  {languages.find((lang) => lang.id === activeLanguage)?.name}
                </Text>
                <Svg name="arrowLeft" />
              </div>

              <Link href={"/account"} className={styles.settings__item}>
                <Svg name="settings" />
                <Text>{t('settings')}</Text>
              </Link>

              {jwt && (
                <div
                  className={styles.settings__item}
                  onClick={() => {
                    logout();
                  }}
                >
                  <Svg name="exit" />
                  <Text>{t('logout')}</Text>
                </div>
              )}
            </div>
          </>
        )}

        {/* Вложенное меню (показывается вместо основного) */}
        {subModal === "theme" && (
          <div className={styles.subMenu}>
            <div
              className={styles.subMenu__header}
              onClick={() => setSubModal(null)}
            >
              <Svg name="arrowLeftFull" />
              <Text weight={400}>{t('theme')}</Text>
            </div>
            <div className={styles.subMenu__list}>
              <Text
                size={14}
                color="gray"
                weight={400}
                className={styles.warningText}
              >
                {t('The setting will be applied only in this browser')}
              </Text>
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`${styles.subMenu__item} ${
                    currentTheme === theme.id ? styles.active : ""
                  }`}
                  onClick={() =>
                    handleThemeChange(theme.id, setTheme, setCurrentTheme)
                  }
                >
                  <div className={currentTheme === theme.id ? styles.checkActive : styles.checkHide}>
                    <Svg name="check" size="small" />
                  </div>
                  <Text weight={400}>{t(theme.name)}</Text>
                </div>
              ))}
            </div>
          </div>
        )}

        {subModal === "language" && (
          <div className={styles.subMenu}>
            <div
              className={styles.subMenu__header}
              onClick={() => setSubModal(null)}
            >
              <Svg name="arrowLeftFull" />
              <Text weight={400}>{t("Interface Language")}</Text>
            </div>
            <Text
              size={14}
              color="gray"
              weight={400}
              className={styles.warningText}
            >
              {t('Buttons and on-screen text in this browser')}
            </Text>
            <div className={styles.subMenu__list}>
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className={`${styles.subMenu__item} ${
                    activeLanguage === lang.id ? styles.active : ""
                  }`}
                  onClick={() => handleLanguageChange(lang.id)}
                >
                  <div className={activeLanguage === lang.id ? styles.checkActive : styles.checkHide}>
                    <Svg name="check" size="small" />
                  </div>
                  <Text weight={400} size={16}>{t(lang.name)}</Text>
                </div>
              ))}
            </div>
          </div>
        )}
      </Popover>
    </>
  );
};
