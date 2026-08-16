import { ChangeEvent, DragEvent, FC, useRef } from 'react'
import clsx from 'clsx'
import { Text } from '@/shared/ui'
import { useCreateVideoModal } from '@/shared/store/createVideoModal'
import styles from './styles.module.scss'


export const AddVideo: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { storedFile, addStoredFile, addVideoData } = useCreateVideoModal()

    const handleSetFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        
        if (file) {
            addStoredFile(file)
        }
    }

    const handleOpenInput = () => {
        if(inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]
        if (file) {
            addStoredFile(file)
        }
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
        <div className={styles.addVideo}>
            <input 
                type="file" 
                accept="mp4" 
                className={styles.input} 
                ref={inputRef} 
                onChange={handleSetFile} 
            />
            <div 
                className={styles.content} 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className={clsx(styles.imgContainer, styles.disableEvents)} id="imgContainer">
                    <div className={styles.imgWrapper}>
                        <img src="/defaultImages/arrowUpFat.png" alt="upload" className={styles.img} />
                    </div>
                </div>
                <Text size={20}>Перетащите файлы сюда или нажмите кнопку ниже, чтобы выбрать их на компьютере</Text>
                <Text size={16} color="var(--descriptionText)">Пока вы не опубликуете видео, доступ к ним будет ограниченный</Text>
                <Text>{storedFile?.name}</Text>
                <button className={styles.inputBtn} onClick={handleOpenInput}>
                    <Text size={16} weight={500} color="var(--whiteText)">Выбрать файлы</Text>
                </button>
            </div>
        </div>
    )
}