import { ILink } from "@/entities/channels/modal/types"
import { EllipsisText, Modal, Svg, Text } from "@/shared/ui"
import { useState } from "react"

interface IEllipsisChannelText {
    name: string
    description: string
    subscribersCount: number
    videosCount: number
    viewersCount: number
    country: string
    createdAt?: string
    links: ILink[]
}

export const EllipsisChannelText: React.FC<IEllipsisChannelText> = ({
    name,
    description,
    subscribersCount,
    videosCount,
    viewersCount,
    country,
    createdAt,
    links
}) => {

    const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false)

    return (
        <div>
            <EllipsisText text={description} symbolCount={200} customHandler={() => setIsOpenedModal(true)}/>
            <Modal isVisible={isOpenedModal} setIsVisible={setIsOpenedModal} isOverlay isCloseButton title={name}>
                <div>
                    <Text>Описание</Text>
                    <Text>{description}</Text>
                    <Text>Ссылки</Text>
                    {links.map((link: ILink) => (
                        <div>
                            <Svg name="bell" />
                            <div>
                                <Text>{link.name}</Text>
                                <Text>{link.url}</Text>
                            </div>
                        </div>
                    ))}
                    <Text>Дополнительная информация</Text>
                    <div>
                        <div>
                            <Svg name="letter"></Svg>
                            <Text>Показать адрес электронной почты</Text>
                        </div>
                        <div>
                            <Svg name="youTube"></Svg>
                            <Text>ссылка на канал</Text>
                        </div>
                        <div>
                            <Svg name="globe"></Svg>
                            <Text>{country}</Text>
                        </div>
                        <div>
                            <Svg name="info"></Svg>
                            <Text>Дата регистрации: {createdAt}</Text>
                        </div>
                        <div>
                            <Svg name="viewers"></Svg>
                            <Text>{subscribersCount} подписчиков</Text>
                        </div>
                        <div>
                            <Svg name="vidoeCount"></Svg>
                            <Text>{videosCount} видео</Text>
                        </div>
                        <div>
                            <Svg name="stoncks"></Svg>
                            <Text>{viewersCount} просмотров</Text>
                        </div>
                    </div>
                    <div>
                        <button>
                            <div>
                                <Svg name="share"></Svg>
                                <Text>{viewersCount} Поделиться каналом</Text>
                            </div>
                        </button>
                        <button>
                            <div>
                                <Svg name="flag"></Svg>
                                <Text>Пожаловаться на пользователя</Text>
                            </div>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}