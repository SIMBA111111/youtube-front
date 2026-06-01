import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { Text } from "@/shared/ui/Text"
import { Modal } from "../../shared/ui/Modal"
import { AddVideo } from "./AddVideo"
import { CreateVideoStepper } from "./CreateVideoStepper"
import styles from './styles.module.scss'


export const CreateVideoModal = () => {
    const {isOpened, toggleCreateModal} = useCreateVideoModal()
    const { storedFile, addStoredFile } = useCreateVideoModal()

    return (
        <Modal 
            isVisible={isOpened} 
            setIsVisible={() => toggleCreateModal()} 
            isOverlay 
            title={<Text weight={600} size={24}>{storedFile ? storedFile.name : 'Загрузка видео'}</Text>}
            className={styles.modal}
        >
            {!storedFile ? 
                <AddVideo/> 
                :
                <CreateVideoStepper/>
            }
        </Modal>
    )
}