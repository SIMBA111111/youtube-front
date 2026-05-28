import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { Text } from "@/shared/ui/Text"
import { Modal } from "../.."
import styles from './styles.module.scss'
import { ChangeEvent, ChangeEventHandler, useState } from "react"


export const CreateVideoModal = () => {
    const {isOpened, toggleCreateModal} = useCreateVideoModal()
    const [file, setFile] = useState<File>()

    const handleSetFile = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files[0])
    }

    console.log('file = ', file);
    

    return (
        <Modal 
            isVisible={isOpened} 
            setIsVisible={() => toggleCreateModal()} 
            isOverlay 
            title={<Text weight={600} size={24}>Загрузка видео</Text>}
            className={styles.modal}
        >
            {/* <input type="file" accept="mp4" className={styles.input} onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetFile(event)}/> */}
            
            <div className={styles.content}>
                <Text size={20}>Перетащите файлы сюда или нажмите кнопку ниже, чтобы выбрать их на компьютере</Text>
                <Text size={16} color="var(--descriptionText)">Пока вы не опубликуете видео,доступ к ним будет ограниченный</Text>
                <Text>{file?.name}</Text>
                {/* <button className={styles.btn} onChange={(event: any) => handleSetFile(event)}>
                    <Text size={16} weight={500} color="var(--whiteText)">Выбрать файлы</Text>
                </button> */}
                <input type="file" accept="mp4" className={styles.inputBtn} onChange={(event: ChangeEvent<HTMLInputElement>) => handleSetFile(event)}/>
            </div>
            
            
        </Modal>
    )
}