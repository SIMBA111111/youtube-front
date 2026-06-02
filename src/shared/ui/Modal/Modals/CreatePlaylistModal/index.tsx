import { FC, useRef, useEffect, useState, ChangeEventHandler } from "react"
import clsx from "clsx"
import Cookies from "js-cookie"
import { Text } from "@/shared/ui/Text"
import { createPlaylist } from "@/shared/api/playlists/createPlaylist"
import { Modal } from "../.."
import styles from './styles.module.scss'
import { Svg } from "@/shared/ui/Svg"


interface ICreatePlaylistModal {
    isVisibleModal: boolean
    setIsVisibleModal: (newValue: boolean) => void
}

export const CreatePlaylistModal: FC<ICreatePlaylistModal> = ({
    isVisibleModal,
    setIsVisibleModal
}) => {
    const nameRef = useRef<HTMLTextAreaElement>(null);
    const iconInputRef = useRef<HTMLInputElement>(null);
    const [iconPreview, setIconPreview] = useState<string>('')
    const [preview, setPreview] = useState<File | null>(null)

    const userId = JSON.parse(Cookies.get('channelData') || '{}').id
    const jwt = Cookies.get('jwt')

    // console.log('userId = ', userId);
    // console.log('jwt = ', jwt);
    // console.log('iconPreview = ', iconPreview);
    // console.log('iconInputRef = ', iconInputRef.current?.files[0]);
    

    // Сбрасываем значение при открытии
    useEffect(() => {
        if (isVisibleModal && nameRef.current) {
            nameRef.current.value = '';
            nameRef.current.focus();
        }
    }, [isVisibleModal]);

    const handleCreate = async () => {
        const name = nameRef.current?.value;
        if (name && preview) {
            console.log('Создать плейлист:', name);
            if (nameRef.current?.value && iconPreview) {
                await createPlaylist(userId, jwt, nameRef.current?.value, preview)
            }
            setIsVisibleModal(false);
        }
    };


    const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleIconUpload');
        console.log(e.target.files);
        
        
        const file = e.target.files?.[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
                setPreview(file)
                // Здесь можно сохранить файл в стор, если нужно
                // addVideoData({ icon: file });
            };
            reader.readAsDataURL(file);
            
        } else {
            alert('Пожалуйста, загрузите файл в формате PNG');
            if (iconInputRef.current) iconInputRef.current.value = '';
        }
    };



    return (
        <Modal 
            isVisible={isVisibleModal} 
            setIsVisible={setIsVisibleModal} 
            className={styles.modal} 
            isOverlay={true}
            title={<Text size={20} weight={700}>Новый плейлист</Text>}
        >
            <div className={styles.container}>
                <div className={styles.field}>
                    <label htmlFor="playlist-name" className={styles.label}>Название плейлиста</label>
                    <textarea 
                        id="playlist-name"
                        ref={nameRef}
                        placeholder="Например, 'Мои любимые треки'"
                        className={clsx(styles.area, styles.areaName)}
                        maxLength={100}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleCreate();
                            }
                        }}
                    />
                    <div className={styles.hint}>Хорошее название помогает найти плейлист</div>
                </div>

                <div className={styles.previewFile}>
                    <input 
                        type="file" 
                        accept="image/png,image/jpeg,image/jpg" 
                        onChange={handleIconUpload}
                        className={styles.file}
                        id="playlist-thumbnail"
                    />
                    <label htmlFor="playlist-thumbnail" className={styles.addFile}>
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
                </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.footer}>
                <button onClick={() => setIsVisibleModal(false)} className={styles.cancelBtn}>
                    <Text>Отмена</Text>
                </button>
                <button onClick={handleCreate} className={styles.createBtn} disabled={!(nameRef.current?.value && preview)}>
                    <Text>Создать</Text>
                </button>
            </div>
        </Modal>
    );
};