import { useEffect, useRef, useState } from "react";
import { useCreateVideoModal } from "@/shared/store/createVideoModal";
import { createVideo } from "@/shared/api/video/admin/createVideo";
import LoadingDots from "@/shared/ui/LoadingDots";
import { RadioButton, Text } from "@/shared/ui";
import { VIDEO_ACCESS } from "@/shared/constants/radioButtons";
import { getChannelDataClient } from "@/shared/hooks/getChannelDataClient";
import { TSteps } from "..";
import styles from "./styles.module.scss";


export const StepAccess = ({setActiveStep, setLastCompletedStep, lastCompletedStep}: {setActiveStep: (newStep: TSteps) => void, setLastCompletedStep: (newStep: TSteps) => void, lastCompletedStep: number}) => {

    const { storedFile, addVideoData, videoData, closeCreateModal, addStoredFile } = useCreateVideoModal()

    const [loadedPercentage, setLoadedPercentage] = useState<number | null>(null)
    const [isVideoUploaded, setIsVideoUploaded] = useState<boolean>(false)
    const [videoAccess, setVideoAccess] = useState<string>(videoData.videoAccess)
    const eventSourceRef = useRef<EventSource>(null)
    const userData = getChannelDataClient()

    useEffect(() => {
        (async() => {
            if (storedFile) {
                try {
                    eventSourceRef.current = new EventSource(`http://localhost:8080/api/event/video-process/${userData?.id}`,{
                        withCredentials: true,
                    });

                    eventSourceRef.current.onmessage = (event) => {
                        if (event.data) {
                            setLoadedPercentage(JSON.parse(event.data).progress)
                        }
                    }
                } catch (error) {
                    console.error('EVENT ERRROR: ', error);
                    setLoadedPercentage(0)
                    if (eventSourceRef.current) {
                        eventSourceRef.current.close()
                    }
                }
            }
        })() 

        return (() => {
            setLoadedPercentage(0)

            if (eventSourceRef.current) {
                eventSourceRef.current.close()
            }
        })
    }, [])

    if (!userData) {
        return (
            <div>Нет юзера</div>
        )
    }

    const handleStartUploadVideo = async () => {
        if (storedFile) {
            const preparedVideoData = {...videoData, iconPreview: ''}

            console.log('videoData: ', videoData);
            console.log('videoAccess: ', videoAccess);

            const res = await createVideo(userData.id, 'asopkdopkasd', videoData, storedFile)
            setIsVideoUploaded(true)
        }
    }

    const handleChangeVideoAccess = (newAccessValue: string) => {
        setVideoAccess(newAccessValue)
        addVideoData({
            ...videoData,
            videoAccess: newAccessValue
        })
    }

    const handleCloseCreateVideoModal = () => {
        addVideoData({
            videoName: "",
            videoDescription: "",
            videoPreview: "",
            iconPreview: "",
            videoAccess: "public",
            playlistIds: [],
            fragments: [],
            isShort: false,
        })
        addStoredFile(null)
        setLoadedPercentage(null)
        setIsVideoUploaded(false)
        closeCreateModal()
        window.location.replace(`/creator/${userData.id}/videos`);
    }

    return (
        <div className={styles.stepAccess}>
            <div>
                <div className={styles.accesses}>
                    <Text size={20}>Доступ к видео:</Text>
                    <RadioButton options={VIDEO_ACCESS} onChange={(e) => handleChangeVideoAccess(e)} value={videoAccess} name="1" className={styles.radio} />
                </div>
                
                {loadedPercentage ? (
                    <div className={styles.loadedPercentage}>
                        Загружено: {loadedPercentage} %{loadedPercentage === 100 ? '' : <LoadingDots/>}
                    </div>
                ) : (
                    null
                )}
            </div>

            <div className={styles.footer}>
                {
                isVideoUploaded ? (
                    <button className={styles.completeBtn} onClick={handleCloseCreateVideoModal}>Завершить</button>
                ) : (
                    <button className={styles.completeBtn} onClick={handleStartUploadVideo}>Загрузить видео</button>
                )}
            </div>
        </div>
    )
}
