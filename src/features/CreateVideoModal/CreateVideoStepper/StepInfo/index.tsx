import clsx from "clsx";
import { useRef, useState, FormEvent, useEffect } from "react";
import Cookies from "js-cookie"
import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { Svg, Text } from "@/shared/ui"
import { IOption, Selector } from "@/shared/ui/Selector"
import { SelectorPlaylist } from "@/shared/ui/Selector/SelectorPlaylists";
import { getPlaylistsByUsername } from "@/shared/api/playlists/getPlaylistsByChannelHash";
import { TSteps } from "..";
import styles from './styles.module.scss'


export const StepInfo = ({setActiveStep}: {setActiveStep: (newStep: TSteps) => void}) => {
    const { addVideoData, storedFile, videoData } = useCreateVideoModal()
    const [selectedPlaylist, setSelectedPlaylist] = useState<IOption[]>([])
    const [iconPreview, setIconPreview] = useState<string | null>(null)
    const [selectorOptions, setSelectorOptions] = useState<IOption[]>([])
    const [videoName, setVideoName] = useState<string>(videoData.videoName || '')
    const [videoDescription, setVideoDescription] = useState<string>(videoData.videoDescription || '')
    const [iconFile, setIconFile] = useState<File | null>(null)
    
    const iconInputRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLTextAreaElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);

    // Проверка, можно ли включить кнопку
    const isFormValid = () => {
        // Проверяем, что есть название видео
        const hasVideoName = videoName.trim().length > 0;
        // Проверяем, что есть файл видео (storedFile)
        const hasVideoFile = storedFile !== null;
        // Проверяем, что выбран хотя бы один плейлист
        const hasPlaylist = selectedPlaylist.length > 0;
        // Проверяем, что загружена миниатюра
        const hasIcon = iconFile !== null;
        
        return hasVideoName && hasVideoFile && hasPlaylist && hasIcon;
    };

    // Обновляем состояние disabled при изменении полей 
    // надо сделать true по умолчанию
    const [isDisabledContinue, setIsDisabledContinue] = useState<boolean>(false);

    useEffect(() => {
        // setIsDisabledContinue(!isFormValid());
    }, [videoName, storedFile, selectedPlaylist, iconFile]);

    useEffect(() => {
        (async () => {
            const userId = JSON.parse(Cookies.get('channelData') || '{}').username
            const res = await getPlaylistsByUsername(userId)

            if (res.playlists && res.playlists.length > 0) {
                setSelectorOptions(res.playlists.map(p => {return { value: p.id, label: p.name }}))
            }
        })()
    }, [])

    const handlePlaylistChange = (option: IOption[]) => {
        setSelectedPlaylist(option);
    };

    const handleVideoNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoName(e.target.value);
        addVideoData({ name: e.target.value });
    };

    const handleVideoDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoDescription(e.target.value);
        addVideoData({ description: e.target.value });
    };

    const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
            if (validTypes.includes(file.type)) {
                if (file.size <= 2 * 1024 * 1024) {
                    setIconFile(file);
                    const reader = new FileReader();
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

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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
            formData['playlistIds'] = selectedPlaylist.map((p: IOption) => p.value)
        }
        
        if (iconFile) {
            formData['videoPreview'] = iconFile
        }

        console.log('formData = ', formData);
        addVideoData(formData)
        setActiveStep(1)
    };

    console.log('videoData = ', videoData);
    console.log('isFormValid:', isFormValid());
    console.log('disabled:', isDisabledContinue);

    // Форматирование имени файла (обрезаем длинные имена)
    const formatFileName = (fileName: string) => {
        if (fileName.length > 40) {
            return fileName.substring(0, 37) + '...';
        }
        return fileName;
    };

    return (
        <div className={styles.stepInfo}>
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="video-name" className={styles.label}>
                        Название видео <span className={styles.required}>*</span>
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
                        <Text weight={500}>Миниатюра (значок) <span className={styles.required}>*</span></Text>
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

                <div className={styles.playlists}>
                    <div className={styles.playlistsHeader}>
                        <Text>Плейлисты <span className={styles.required}>*</span></Text>
                        <Text color="secondary">
                            Добавьте видео хотя бы в один плейлист, чтобы людям было удобнее 
                            ориентироваться на вашем канале
                        </Text>
                    </div>
                    <SelectorPlaylist 
                        options={selectorOptions}
                        placeholder="Выберите плейлист"
                        onChange={handlePlaylistChange}
                        defaultValue={selectedPlaylist}
                    />
                    {selectedPlaylist.length === 0 && <div className={styles.errorText}>Выберите хотя бы один плейлист</div>}
                </div>

                <button 
                    type="submit" 
                    className={clsx(styles.submitButton, {
                        [styles.disabled]: isDisabledContinue
                    })} 
                    // disabled={isDisabledContinue}
                >
                    Продолжить
                </button>
            </form>
        </div>
    )
}