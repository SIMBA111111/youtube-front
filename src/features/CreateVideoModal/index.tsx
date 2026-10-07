import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { Text } from "@/shared/ui/Text"
import { Modal } from "../../shared/ui/Modal"
import { AddVideo } from "./AddVideo"
import { CreateVideoStepper } from "./CreateVideoStepper"
import { useSearchParams } from "next/navigation"
import styles from './styles.module.scss'


export const CreateVideoModal = () => {
    const { closeCreateModal, storedFile} = useCreateVideoModal()

    const searchParams = useSearchParams()
    const isOpened = searchParams.get('createVideo') === 'true'

    return (
        <Modal 
            isVisible={isOpened} 
            setIsVisible={() => closeCreateModal()} 
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