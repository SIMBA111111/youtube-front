'use client'

import { BackgroundFon, Modal, Svg, Text } from "@/shared/ui";
import { IUserBtn } from "../model/types";
import styles from './styles.module.scss'
import Link from "next/link";
import { useState } from "react";
import { themes } from "@/shared/constants/themes";
import { languages } from "@/shared/constants/langs";
import { handleThemeChange } from "../lib/handleThemeChange";
import { handleLanguageChange } from "../lib/handleLanguageChange";
import Cookies from 'js-cookie'
import { Theme, Themes, useTheme } from "@/app/providers/themeProvider";

type SubModalType = 'theme' | 'language' | null;

export const UserBtn: React.FC<IUserBtn> = (props) => {
    const { id, username, channelName, avatarUrl, 
        // activeTheme,
            activeLanguage } = props
    const { theme, setTheme } = useTheme();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [subModal, setSubModal] = useState<SubModalType>(null)
    const [currentTheme, setCurrentTheme] = useState<Theme>(theme)
    
    
    

    return (
        <>
            <img 
                src={avatarUrl} 
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
                {/* Информация о канале всегда видна */}


                {/* Основное меню (скрывается когда открыта вложенная модалка) */}
                {!subModal && (<>
                    <div className={styles.channel}>
                        <img src={avatarUrl} alt="" className={styles.modalAvatar}/>
                        <div className={styles.channelData}>
                            <Text weight={400}>{channelName}</Text>
                            <Text weight={400}>{username}</Text>
                            <Link href={'/'}>
                                <Text weight={400} size={14} color="blue">Посмотреть канал</Text>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.settings}>
                        <div 
                            className={styles.settings__item}
                            onClick={() => setSubModal('theme')}
                        >
                            <Svg name="moon"/>
                            <Text weight={400}>Тема: {Themes[currentTheme]}</Text>
                            <Svg name="arrowLeft"/>
                        </div>

                        <div 
                            className={styles.settings__item}
                            onClick={() => setSubModal('language')}
                        >
                            <Svg name="lenguage"/>
                            <Text weight={400}>Язык интерфейса: {activeLanguage}</Text>
                            <Svg name="arrowLeft"/>
                        </div>

                        <Link href={'/account'} className={styles.settings__item}>
                            <Svg name="settings"/>
                            <Text weight={400}>Настройки</Text>
                        </Link>

                        <div className={styles.settings__item}>
                            <Svg name="exit"/>
                            <Text weight={400}>Выйти</Text>
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
                            <Text weight={400}>Язык интерфейса</Text>
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