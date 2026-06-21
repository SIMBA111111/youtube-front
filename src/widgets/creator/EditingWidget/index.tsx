'use client'

import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Svg, Text } from "@/shared/ui";
import { IChannel } from "@/entities/channels/modal/types";
import { FormProvider, useFieldArray, useForm,  } from "react-hook-form";
import styles from './styles.module.scss'
import { updateChannelInfoById } from "@/shared/api/channels/updateChannelInfo";


interface IEditingWidget {
    channelData: IChannel
}

interface IFormValues {
    bannerUrl: string;
    avatarUrl: string;
    channelName: string;
    channelDescription: string;
    links: string[];
    email: string;
}

type inputId = 'bannerUrl' | 'avatarUrl'

export const EditingWidget: FC<IEditingWidget> = ({
    channelData
}) => {

    const [bannerImage, setBannerImage] = useState<string>(channelData.banner_url || '')
    const [avatarImage, setAvatarImage] = useState<string>(channelData.avatar_url || '')

    const methods = useForm<IFormValues>({
        defaultValues: {
            bannerUrl: bannerImage,
            avatarUrl: avatarImage,
            channelName: channelData.name || '',
            channelDescription: channelData.description || '',
            links: channelData.links ? channelData.links : [],
            email: channelData.email || ''
        }
    });

    const { register, handleSubmit, control, watch, setValue } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "links",
        
    });

    const handleBannerChange = (e: ChangeEvent, fieldName: inputId) => {
        const file = e.target.files?.[0]
        
        const reader = new FileReader();
        
        reader.onloadend = () => {
            fieldName === 'bannerUrl' ? (
                setBannerImage(reader.result as string)
            ) : (
                setAvatarImage(reader.result as string)
            )

        };
        reader.readAsDataURL(file);

        setValue(fieldName, file)
    }

    const handleClickChangeBanner = (fieldName: inputId) => {
        const bannerImg = document.getElementById(fieldName)
        bannerImg?.click()
    }

    const handleRemoveBanner = (fieldName: inputId) => {
        if (fieldName === 'bannerUrl') {
            setBannerImage('')
            setValue('bannerUrl', '')
        } else {
            setAvatarImage('')
            setValue('avatarUrl', '')
        }
    }


    const onSubmit = async (data: IFormValues) => {
        // Сравниваем изменения
        const changes: Partial<IFormValues> = {};
        
        // Проверяем название канала
        if (data.channelName !== channelData.name) {
            changes.channelName = data.channelName;
        }
        
        // Проверяем описание канала
        if (data.channelDescription !== channelData.description) {
            changes.channelDescription = data.channelDescription;
        }
        
        // Проверяем email
        if (data.email !== channelData.email) {
            changes.email = data.email;
        }
        
        // Проверяем ссылки (сравниваем массивы)
        const currentLinks = data.links || [];
        const originalLinks = channelData.links || [];
        
        // Проверяем, изменился ли массив ссылок
        if (currentLinks.length !== originalLinks.length || 
            currentLinks.some((link, index) => link !== originalLinks[index])) {
            changes.links = currentLinks;
        }
        
        // Проверяем баннер (если загружен новый файл)
        if (bannerImage !== channelData.banner_url) {
            changes.bannerUrl = data.bannerUrl;
        }
        
        // Проверяем аватар (если загружен новый файл)
        if (avatarImage !== channelData.avatar_url) {
            changes.avatarUrl = data.avatarUrl;
        }

        // Если нет изменений - ничего не отправляем
        if (Object.keys(changes).length === 0) {
            console.log('Нет изменений для сохранения');
            return;
        }

        console.log('Измененные поля:', changes);
        
        // Отправляем только измененные данные
        try {
            const formData = new FormData();
            
            // Добавляем все измененные поля в FormData
            Object.entries(changes).forEach(([key, value]) => {
                // console.log(key, value);
                
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            await updateChannelInfoById(channelData.id, formData);
            console.log('Данные успешно обновлены');
        } catch (error) {
            console.error('Ошибка при обновлении:', error);
        }
    };

    // console.log('bannerImage = ', bannerImage);
    // console.log('avatarImage = ', avatarImage);
    // console.log('channelData = ', channelData);

    return (
        <FormProvider {...methods}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.banner}>
                        <h2 className={styles.sectionTitle}>Баннер</h2>
                        <Text color="var(--lightBlackBackground)">
                            Это изображение показывается в верхней части страницы канала.
                        </Text>
                        <div className={styles.cardWrapper}>
                            <div className={styles.contentRow}>
                                <div className={styles.previewArea}>
                                    <div className={styles.bannerPreview}>
                                        <input type="file" id="bannerUrl" style={{display: 'none'}} onChange={(e: ChangeEvent) => handleBannerChange(e, 'bannerUrl')} />
                                        <img 
                                            src={bannerImage} 
                                            alt="Баннер" 
                                            
                                        />
                                    </div>
                                </div>
                                <div className={styles.infoArea}>
                                    <Text color="var(--lightBlackBackground)" lineHeight={20}>
                                        Чтобы канал выглядел привлекательно на всех устройствах, советуем загрузить изображение размером не менее 2048 x 1152 пикс. Размер файла – не более 6 МБ.
                                    </Text>
                                    <div className={styles.buttonGroup}>
                                        <button
                                            className={styles.primaryBtn} 
                                            onClick={() => handleClickChangeBanner('bannerUrl')}
                                        >
                                            <Text color="var(--blackText)" weight={500}>Изменить</Text>
                                        </button>
                                        <button className={styles.secondaryBtn}><Text color="var(--blackText)" weight={500}>Удалить</Text></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.photo}>
                        <h2 className={styles.sectionTitle}>Фото профиля</h2>
                        <Text color="var(--lightBlackBackground)">
                            Фото профиля показывается, например, рядом с вашими видео или комментариями на YouTube.
                        </Text>
                        <div className={styles.cardWrapper}>
                            <div className={styles.contentRow}>
                                <div className={styles.previewArea}>
                                    <div className={styles.photoPreview}>
                                        <input type="file" id="avatarUrl" style={{display: "none"}} onChange={(e: ChangeEvent) => handleBannerChange(e, 'avatarUrl')}/>
                                        <img src={avatarImage} alt="Фото профиля"/>
                                    </div>
                                </div>
                                <div className={styles.infoArea}>
                                    <Text color="var(--lightBlackBackground)" lineHeight={20}>
                                        Рекомендуем использовать изображение размером не менее 98 х 98 пикселей в формате PNG или GIF. Анимированные картинки загружать нельзя. Размер файла – не более 4 МБ. Помните, что изображение должно соответствовать правилам сообщества YouTube.
                                    </Text>
                                    <div className={styles.buttonGroup} onClick={() => handleClickChangeBanner('avatarUrl')}>
                                        <button className={styles.primaryBtn} ><Text color="var(--blackText)" weight={500}>Изменить</Text></button>
                                        <button className={styles.secondaryBtn}><Text color="var(--blackText)" weight={500}>Удалить</Text></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.channelName}>
                        <h2 className={styles.sectionTitle}>Название канала</h2>
                        <Text color="var(--lightBlackBackground)" lineHeight={20}>
                            Придумайте название канала, которое будет представлять вас и ваш контент. Если вы укажете другое название или поменяете фото профиля, эти изменения будут видны только на YouTube, а не во всех сервисах Google. Изменить имя можно дважды в течение 14 дней.
                        </Text>
                        <input 
                            type="text" 
                            className={styles.channelNameInput}
                            placeholder="Название канала"
                            defaultValue={channelData.name}
                            {...register('channelName')}
                        />
                    </div>

                    <div className={styles.channelName}>
                        <h2 className={styles.sectionTitle}>Описание канала</h2>
                        <textarea 
                            className={styles.textarea}
                            placeholder="Расскажите о своем канале..."
                            defaultValue={channelData.description}
                            {...register('channelDescription')}
                        />
                    </div>

                    <div className={styles.channelName}>
                        <h2 className={styles.sectionTitle}>Ссылки</h2>
                        <Text color="var(--lightBlackBackground)">
                            Поделитесь внешними ссылками с аудиторией. Они будут видны в профиле канала и на вкладке "О канале".
                        </Text>
                        
                        <div className={styles.linksList}>
                            {fields.map((link, index) => (
                                <div key={link.id} className={styles.linkItem}>
                                    <input 
                                        type="url"
                                        placeholder="https://example.com"
                                        {...register(`links.${index}`)}
                                    />
                                    <div onClick={() => remove(index)} style={{cursor: 'pointer'}}>
                                        <Svg 
                                            name="cross" 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button 
                            type="button" 
                            onClick={() => append('')} 
                            className={styles.addLinkBtn}
                        >
                            Добавить ссылку
                        </button>
                    </div>

                    <div className={styles.contactsSection}>
                        <h2 className={styles.sectionTitle}>Контактная информация</h2>
                        <Text color="var(--lightBlackBackground)">
                            Укажите, как связаться с вами по вопросам сотрудничества. Зрители могут увидеть адрес электронной почты на вкладке "О канале".
                        </Text>
                        
                        <input 
                            type="email" 
                            className={styles.emailInput}
                            placeholder="your@email.com"
                            {...register(`email`)}
                        />
                    </div>

                    <div className={styles.saveButtonWrapper}>
                        <button type="submit" className={styles.saveButton}>
                            <Text color="var(--whiteText)">Сохранить</Text>
                        </button>
                    </div>
                </form>
            </div>
        </FormProvider>
    )
}