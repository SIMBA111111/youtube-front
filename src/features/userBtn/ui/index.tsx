'use client'

import Cookies from 'js-cookie'
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { themes } from "@/shared/constants/themes";
import { languages } from "@/shared/constants/langs";
import { logout } from "@/shared/api/auth/logout";
import { BackgroundFon, Modal, Svg, Text } from "@/shared/ui";
import { Theme, Themes, useTheme } from "@/app/providers/themeProvider";

import { handleThemeChange } from "../lib/handleThemeChange";
import { IUserBtn } from "../model/types";
import '../../../shared/i18s/i18s'

import styles from './styles.module.scss'


type SubModalType = 'theme' | 'language' | null;

export const UserBtn: React.FC<IUserBtn> = ({id, username, channelName, avatarUrl}) => {
    const { theme, setTheme } = useTheme();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [subModal, setSubModal] = useState<SubModalType>(null)
    const [currentTheme, setCurrentTheme] = useState<Theme>(theme)
    const { t, i18n } = useTranslation();
    
    const handleLanguageChange = async (lang: string) => {
        Cookies.set('lang', lang);
        await i18n.changeLanguage(lang);
    };

    const activeLanguage = Cookies.get('lang') || navigator.language.slice(0, 2)
    const jwt = Cookies.get('jwt')

    return (
        <>
            <img 
                src={avatarUrl ?? 'defaultImages/defaultAvatar.png'} 
                alt="" 
                className={styles.headerAvatar} 
                onClick={() => setIsOpenModal(true)}
            />
            
            <Modal 
                isVisible={isOpenModal} 
                setIsVisible={setIsOpenModal} 
                isCloseButton={false} 
                isOverlay={false} 
                className={styles.userModal}
            >
                {/* Основное меню (скрывается когда открыта вложенная модалка) */}
                {!subModal && (<>
                    {jwt && (
                        <div className={styles.channel}>
                            <img src={avatarUrl ?? 'defaultImages/defaultAvatar.png'} alt="" className={styles.modalAvatar}/>
                            <div className={styles.channelData}>
                                <Text>{channelName}</Text>
                                <Text>{username}</Text>
                                <Link href={'/'}>
                                    <Text color="blue">Посмотреть канал</Text>
                                </Link>
                            </div>
                        </div>
                    )}
                    <div className={styles.settings}>
                        <div 
                            className={styles.settings__item}
                            onClick={() => setSubModal('theme')}
                        >
                            <Svg name="moon"/>
                            <Text>Тема: {Themes[currentTheme]}</Text>
                            <Svg name="arrowLeft"/>
                        </div>

                        <div 
                            className={styles.settings__item}
                            onClick={() => setSubModal('language')}
                        >
                            <Svg name="lenguage"/>
                            <Text>Язык интерфейса: {languages.find((lang) => lang.id === activeLanguage)?.name}</Text>
                            <Svg name="arrowLeft"/>
                        </div>

                        <Link href={'/account'} className={styles.settings__item}>
                            <Svg name="settings"/>
                            <Text>Настройки</Text>
                        </Link>

                        <div className={styles.settings__item} onClick={() => {logout()}}>
                            <Svg name="exit"/>
                            <Text>Выйти</Text>
                        </div>
                    </div>
                </>)}

                {/* Вложенное меню (показывается вместо основного) */}
                {subModal === 'theme' && (
                    <div className={styles.subMenu}>
                        <div className={styles.subMenu__header} onClick={() => setSubModal(null)}>
                            <Svg name="arrowLeftFull" />
                            <Text weight={400}>Тема</Text>
                        </div>
                        <div className={styles.subMenu__list}>
                            <Text size={14} color="gray" weight={400} className={styles.warningText}>Настройка будет применена только в этом браузере.</Text>
                            {themes.map(theme => (
                                <div 
                                    key={theme.id}
                                    className={`${styles.subMenu__item} ${currentTheme === theme.id ? styles.active : ''}`}
                                    onClick={() => handleThemeChange(theme.id, setTheme, setCurrentTheme)}
                                >
                                        <div className={styles.svgColor}>{currentTheme === theme.id && <Svg name="check" />}</div>
                                        <Text weight={400}>{theme.name}</Text>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {subModal === 'language' && (
                    <div className={styles.subMenu}>
                        <div className={styles.subMenu__header} onClick={() => setSubModal(null)}>
                            <BackgroundFon bacgroundColor="">
                                <Svg name="arrowLeftFull" />
                            </BackgroundFon>
                            <Text weight={400}>{t('Interface Language')}</Text>
                        </div>
                        <Text size={14} color="gray" weight={400} className={styles.warningText}>Кнопки и текст на экране в этом браузере</Text>
                        <div className={styles.subMenu__list}>
                            {languages.map(lang => (
                                <div 
                                    key={lang.id}
                                    className={`${styles.subMenu__item} ${activeLanguage === lang.id ? styles.active : ''}`}
                                    onClick={() => handleLanguageChange(lang.id)}
                                >
                                    <div>{activeLanguage === lang.id && <Svg name="check" />}</div>
                                    <Text weight={400}>{lang.name}</Text>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}