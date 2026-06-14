'use client'

import { Dispatch, FC, FormEvent, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import clsx from "clsx"
import { IOption } from "@/shared/ui/Selector"
import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { Svg, Text } from "@/shared/ui"
import { ChooseInput } from "@/shared/ui/ChooseInput"
import { SelectorPlaylist } from "@/shared/ui/Selector/SelectorPlaylists"
import { getVideoByHash } from "@/shared/api/video/getVideoByHash"
import { getTags } from "@/shared/api/tags/getTags"
import styles from './styles.module.scss'
import { getPlaylistsByUsername } from "@/shared/api/playlists/getPlaylistsByChannelHash"
import { updateVideoById } from "@/shared/api/video/updateVideoById"


interface IEditingVideo {
    videoId: string
    videoHash: string
}

export const EditingVideo: FC<IEditingVideo> = ({
    videoHash,
    videoId
}) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<IOption[]>([])
    const [selectedtags, setSelectedTags] = useState<IOption[]>([])
    const [selectedHashtags, setSelectedHashTags] = useState<{ name: string }[]>([])
    const [iconPreview, setIconPreview] = useState<string | null>()
    const [palylistSelectorOptions, setPlaylistSelectorOptions] = useState<IOption[]>([])
    const [tagsSelectorOptions, setTagsSelectorOptions] = useState<IOption[]>([])
    const [videoName, setVideoName] = useState<string>('')
    const [videoDescription, setVideoDescription] = useState<string>('')
    const [iconFile, setIconFile] = useState<File | null>(null)
    
    const iconInputRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLTextAreaElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);

    const getVideoData = async () => {
        const userId = JSON.parse(Cookies.get('channelData') || '{}').username

        const playlists = await getPlaylistsByUsername(userId)
        const videoData = await getVideoByHash(videoHash);
        const tags = await getTags();

        setVideoName(videoData.video.name)
        setVideoDescription(videoData.video.videoDescription)

        setIconPreview(videoData.video.previewUrl)
        
        setTagsSelectorOptions(tags.tags.map(t => { return { value: t.id, label: t.name }}))
        const selectedTags = videoData.video.tags.reduce((arr, el) => {
            const selectedTag = tags.tags.find(t => t.id === el);
            if (selectedTag) {
                arr.push({value: selectedTag.id, label: selectedTag.name});
            }
            return arr;
        }, []);

        setSelectedTags(selectedTags)

        setPlaylistSelectorOptions(playlists.playlists.map(p => {return { value: p.id, label: p.name }}))
        const selectedPlaylists = videoData.video.playlistIds.reduce((arr, el) => {
            const selectedPlaylist = playlists.playlists.find(t => t.id === el);
            if (selectedPlaylist) {
                arr.push({value: selectedPlaylist.id, label: selectedPlaylist.name});
            }
            return arr;
        }, []);
        setSelectedPlaylist(selectedPlaylists)

        setSelectedHashTags(videoData.video.hashtags.map(((h, index) => { return { id: index, name: h }})))
    }

    useEffect(() => {
        getVideoData()
    }, [])

    const handlePlaylistChange = (option: IOption[]) => {
        setSelectedPlaylist(option);
    };

    const handleTagsChange = (option: IOption[]) => {
        setSelectedTags(option);
    };

    const handleSetChoosenData: Dispatch<SetStateAction<Array<{ name: string }>>> = (value) => {
        const newValue = typeof value === 'function' ? value(selectedHashtags) : value;

        const preparedHashtags = newValue.map(n => { 
            return !n.name.startsWith("#") ? (
                { name: '#' + n.name.replaceAll(' ', '') }
            ) : (
                { name: n.name }
            )
        });
        
        setSelectedHashTags(preparedHashtags);
    };

    const handleVideoNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoName(e.target.value);
    };

    const handleVideoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoDescription(e.target.value);
    };

    const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (validTypes.includes(file.type)) {
                if (file.size <= 10 * 1024 * 1024) {
                    setIconFile(file);
                    const reader = new FileReader();
                    console.log('file = ', file);
                    
                    reader.onloadend = () => {
                        setIconPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert('Файл слишком большой. Максимум 2 МБ');
                    if (iconInputRef.current) iconInputRef.current.value = '';
                }
            } else {
                alert('Пожалуйста, загрузите файл в формате PNG, JPG или JPEG');
                if (iconInputRef.current) iconInputRef.current.value = '';
            }
        }
    };

    const handleFormSubmit = async (e: MouseEvent) => {
        e.preventDefault();
        
        // if (!isFormValid()) {
        //     alert('Заполните все обязательные поля: название видео, миниатюра и выберите плейлист');
        //     return;
        // }
        
        const formData: any = {}
        
        if (videoName) {
            formData['videoName'] = videoName
        }
        
        if (videoDescription) {
            formData['videoDescription'] = videoDescription
        }
        
        if (selectedPlaylist.length > 0) {
            formData['playlistIds'] = selectedPlaylist.map(p => { return {id: p.value, name: p.label} })
        }
        
        if (iconFile) {
            formData['videoPreview'] = iconFile
        }

        if (iconPreview) {
            formData['iconPreview'] = iconPreview
        }

        if (selectedHashtags) {
            formData['hashTags'] = selectedHashtags
        }

        if (selectedtags) {
            formData['tags'] = selectedtags
        }

        console.log('formData = ', formData);

        await updateVideoById({formData, videoId})
        
    };

    return (
        <div className={styles.widget}>
            <div className={styles.header}>
                <div className={styles.header_data}>
                    <h1>Сведения о видео</h1>
                    <button className={styles.save} onClick={(e: MouseEvent) => handleFormSubmit(e)}>Сохранить</button>
                </div>
                <div className={clsx(styles.divider, styles.hidden)}></div>
            </div>

            <div className={styles.stepInfo}> 
                <div>
                    <form className={styles.form}>
                        <div className={styles.field}>
                            <label htmlFor="video-name" className={styles.label}>
                                Название видео
                            </label>
                            <textarea 
                                id="video-name"
                                ref={nameRef}
                                placeholder="Например, 'Обзор нового смартфона'"
                                className={clsx(styles.area, styles.areaName)}
                                maxLength={100}
                                value={videoName}
                                onChange={handleVideoNameChange}
                            />
                            <div className={styles.hint}>
                                Хорошее название помогает зрителям найти видео
                                {!videoName && <span className={styles.error}> (обязательное поле)</span>}
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="video-description" className={styles.label}>Описание</label>
                            <textarea 
                                id="video-description"
                                ref={descRef}
                                placeholder="Расскажите, о чём это видео (необязательно)"
                                className={clsx(styles.area, styles.areaDescr)}
                                maxLength={300}
                                value={videoDescription}
                                onChange={handleVideoDescriptionChange}
                            />
                        </div>

                        <div className={styles.preview}>
                            <div className={styles.previewHeader}>
                                <Text weight={500}>Миниатюра (значок)</Text>
                                <Text color="secondary">Выберите значок, который будет привлекать зрителей</Text>
                            </div>
                            
                            <div className={styles.previewFile}>
                                <input 
                                    type="file" 
                                    accept="image/png,image/jpeg,image/jpg" 
                                    onChange={handleIconUpload}
                                    ref={iconInputRef}
                                    className={styles.file}
                                    id="icon-upload"
                                />
                                <label htmlFor="icon-upload" className={styles.addFile}>
                                    {iconPreview ? (
                                        <div className={styles.iconPreview}>
                                            <img src={iconPreview} alt="Preview" />
                                            <div className={styles.changeIcon}>
                                                <Svg name='uploadImage' />
                                                <Text>Изменить</Text>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Svg name='uploadImage' />
                                            <Text>Загрузить файл</Text>
                                            <Text color="secondary">PNG, JPG до 2 МБ</Text>
                                        </>
                                    )}
                                </label>
                                {!iconFile && <div className={styles.errorText}>Обязательное поле</div>}
                            </div>
                        </div>

                        <ChooseInput choosenData={selectedHashtags} setChoosenData={handleSetChoosenData}/>

                        <div className={styles.playlists}>
                            <div className={styles.playlistsHeader}>
                                <Text>Плейлисты</Text>
                                <Text color="secondary">
                                    Добавьте видео хотя бы в один плейлист, чтобы людям было удобнее 
                                    ориентироваться на вашем канале
                                </Text>
                            </div>
                            <SelectorPlaylist 
                                options={palylistSelectorOptions}
                                placeholder="Выберите плейлист"
                                onChange={handlePlaylistChange}
                                defaultValue={selectedPlaylist}
                                showFooter
                            />
                            {selectedPlaylist.length === 0 && <div className={styles.errorText}>Выберите хотя бы один плейлист</div>}
                        </div>

                        <div className={styles.playlists}>
                            <div className={styles.playlistsHeader}>
                                <Text>Тэги</Text>
                                <Text color="secondary">
                                    Добавьте тэги к видео
                                </Text>
                            </div>
                            <SelectorPlaylist 
                                options={tagsSelectorOptions}
                                placeholder="Выберите тэги"
                                onChange={handleTagsChange}
                                defaultValue={selectedtags}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}