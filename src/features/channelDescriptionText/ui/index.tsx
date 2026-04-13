'use client'

import { useState } from "react"

import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Popover, Svg, Text } from "@/shared/ui"
import { copyChannelId } from "../lib/copyChannelId";

import styles from "./styles.module.scss";
import { useToast } from "@/app/providers/toastProvider";
import { sendChannelReport } from "../lib/sendChannelReport";


interface IEllipsisChannelText {
    id: string
    name: string
    description: string
    email: string
    subscribersCount: number
    videosCount: number
    viewersCount: number
    country: string
    createdAt?: string
    links: ILink[]
}

export const EllipsisChannelText: React.FC<IEllipsisChannelText> = ({
    id,
    name,
    description,
    email,
    subscribersCount,
    videosCount,
    viewersCount,
    country,
    createdAt,
    links
}) => {

    const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false)
    const [isOpenedReport, setIsOpenedReport] = useState<boolean>(false)
    const { openToast } = useToast()

    return (
        <div>
            <EllipsisText 
                text={description} 
                symbolCount={50} 
                customHandler={() => setIsOpenedModal(true)}
                className={styles.descriptionText}
            />
            
            <Modal isVisible={isOpenedModal} setIsVisible={setIsOpenedModal} isOverlay isCloseButton title={<Text weight={700} size={20}>{name}</Text>} className={styles.customModal}>
                <div className={styles.customModal_body}>
                    <Text size={20} color="var(--blackText)" weight={700} className={styles.customModal_header}>Описание</Text>
                    <Text lineHeight={20} color="var(--gray)">{description}</Text>
                    <Text size={20} color="var(--blackText)" weight={700} className={styles.customModal_header}>Ссылки</Text>
                    <div className={styles.customModal_links}>
                        {links.map((link: ILink) => (
                            <div className={styles.customModal_links_item} key={link.id}>
                                <Svg name="bell" color="black"/>
                                <div className={styles.customModal_links_item_info}>
                                    <Text size={14}>{link.name}</Text>
                                    <Text size={14} color="var(--blueBorder)">{link.url}</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Text size={20} color="var(--blackText)" weight={700} className={styles.customModal_header}>Дополнительная информация</Text>
                    <div className={styles.customModal_additional}>
                        <div className={styles.customModal_additional_item}>
                            <Svg name="letter"></Svg>
                            <Text size={14}>{email}</Text>
                        </div>
                        <div className={styles.customModal_additional_item}>
                            <Svg name="youTube"></Svg>
                            <Text size={14}>ссылка на канал</Text>
                        </div>
                        <div className={styles.customModal_additional_item}> 
                            <Svg name="globe"></Svg>
                            <Text size={14}>{country}</Text>
                        </div>
                        <div className={styles.customModal_additional_item}>
                            <Svg name="info"></Svg>
                            <Text size={14}>Дата регистрации: {createdAt}</Text>
                        </div>
                        <div className={styles.customModal_additional_item}>
                            <Svg name="viewers"></Svg>
                            <Text size={14}>{subscribersCount} подписчиков</Text>
                        </div>
                        <div className={styles.customModal_additional_item}>
                            <Svg name="vidoeCount"></Svg>
                            <Text size={14}>{videosCount} видео</Text>
                        </div>
                        <div className={styles.customModal_additional_item}>
                            <Svg name="stoncks"></Svg>
                            <Text size={14}>{viewersCount} просмотров</Text>
                        </div>
                    </div>
                    <div className={styles.customModal_buttons}>
                        <button className={styles.customModal_buttons_btn} onClick={() => copyChannelId(id, openToast)}>
                            <div className={styles.customModal_buttons_btn_text}>
                                <Svg name="share"></Svg>
                                <Text size={14}>Поделиться каналом</Text>
                            </div>
                        </button>
                        <button className={styles.customModal_buttons_btn} onClick={() => setIsOpenedReport(true)}>
                            <div className={styles.customModal_buttons_btn_text}>
                                <Svg name="flag"></Svg>
                                <Text size={14}>Пожаловаться на пользователя</Text>
                            </div>
                        </button>
                        <Popover 
                            isOpen={isOpenedReport} 
                            onClose={() => setIsOpenedReport(false)} 
                            className={styles.customPopover}
                            offset={40}
                        >
                            <div className={styles.customPopover_body}>
                                <button className={styles.customPopover_body_item} onClick={() => sendChannelReport(setIsOpenedReport, id, 'FonImage')}>
                                    <Text>Пожаловаться на фоновое изображение</Text>
                                </button>
                                <button className={styles.customPopover_body_item} onClick={() => sendChannelReport(setIsOpenedReport, id, 'AvatarImage')}>
                                    <Text>Пожаловаться на фото профиля</Text>
                                </button>
                                <button className={styles.customPopover_body_item} onClick={() => sendChannelReport(setIsOpenedReport, id, 'User')}>
                                    <Text>Пожаловаться на пользователя</Text>
                                </button>
                            </div>
                        </Popover>
                    </div>
                </div>
            </Modal>
        </div>
    )
}