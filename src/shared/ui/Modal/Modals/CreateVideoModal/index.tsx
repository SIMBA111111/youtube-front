import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { Text } from "@/shared/ui/Text"
import { Modal } from "../.."
import styles from './styles.module.scss'
import { ChangeEvent, ChangeEventHandler, DragEvent, DragEventHandler, useRef, useState } from "react"
import { Svg } from "@/shared/ui/Svg"
import clsx from "clsx"


export const CreateVideoModal = () => {
    const {isOpened, toggleCreateModal} = useCreateVideoModal()
    const [file, setFile] = useState<File>()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSetFile = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files[0])
    }

    const handleOpenInput = () => {
        if(inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setFile(event.dataTransfer.files[0])
        const imgContainer = document.getElementById('imgContainer')
        if(imgContainer?.classList.contains(styles.imgContainerSquashed))
            imgContainer?.classList.remove(styles.imgContainerSquashed)
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const imgContainer = document.getElementById('imgContainer')
        if(!imgContainer?.classList.contains(styles.imgContainerSquashed))
            imgContainer?.classList.add(styles.imgContainerSquashed)
    }

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()

        // если элемент внутри content, то игнорируем. Это нужна чтобы leave не срабатывал. 
        const relatedTarget = event.relatedTarget as Node | null;
        const currentTarget = event.currentTarget as Node;
        if (relatedTarget && currentTarget.contains(relatedTarget)) {
            return;
        }

        const imgContainer = document.getElementById('imgContainer')
        if(imgContainer?.classList.contains(styles.imgContainerSquashed))
            imgContainer?.classList.remove(styles.imgContainerSquashed)
    }


    return (
        <Modal 
            isVisible={isOpened} 
            setIsVisible={() => toggleCreateModal()} 
            isOverlay 
            title={<Text weight={600} size={24}>Загрузка видео</Text>}
            className={styles.modal}
        >
            <input 
                type="file" 
                accept="mp4" 
                className={styles.input} 
                ref={inputRef} onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetFile(event)} 
            />
            <div 
                className={styles.content} 
                onDrop={(event: DragEvent<HTMLDivElement>) => handleDrop(event)}
                onDragOver={(event: DragEvent<HTMLDivElement>) => handleDragOver(event)}
                onDragLeave={(event: DragEvent<HTMLDivElement>) => handleDragLeave(event)}
            >
                <div className={clsx(styles.imgContainer, styles.disableEvents)} id="imgContainer">
                    <div className={styles.imgWrapper}>
                        <img src="/defaultImages/arrowUpFat.png" alt="asdasd" className={styles.img} />
                    </div>
                </div>
                <Text size={20}>Перетащите файлы сюда или нажмите кнопку ниже, чтобы выбрать их на компьютере</Text>
                <Text size={16} color="var(--descriptionText)">Пока вы не опубликуете видео,доступ к ним будет ограниченный</Text>
                <Text >{file?.name}</Text>
                <button className={styles.inputBtn} onChange={(event: any) => handleSetFile(event)} onClick={() => handleOpenInput()}>
                    <Text size={16} weight={500} color="var(--whiteText)">Выбрать файлы</Text>
                </button>
            </div>
            
            
        </Modal>
    )
}