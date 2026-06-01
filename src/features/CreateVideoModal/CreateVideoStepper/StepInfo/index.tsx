import { useCreateVideoModal } from "@/shared/store/createVideoModal"
import { Svg, Text } from "@/shared/ui"
import { IOption, Selector } from "@/shared/ui/Selector"
import styles from './styles.module.scss'
import clsx from "clsx";


const options = [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
    { value: 'option3', label: 'Опция 3' },
    { value: 'option4', label: 'Опция 4' },
];

export const StepInfo = () => {
    const { addVideoData, storedFile } = useCreateVideoModal()
    
    const handleChange = (option: IOption) => {
        console.log('Выбрано:', option);
    };


    const handleFormSubmit = (formData: FormData) => {
        console.log('formData:', formData);
    };

    console.log('storedFile = ', storedFile);
    

    return (
        <div className={styles.stepInfo}>
            <form action={handleFormSubmit} className={styles.form}>
                <textarea name="" id="" placeholder="имя" className={clsx(styles.area, styles.areaName)}></textarea>
                <textarea name="" id="" placeholder="описание" className={clsx(styles.area, styles.areaDescr)}></textarea>

                <div className={styles.preview}>
                    <Text>Значок</Text>
                    <Text>Выберите значок, который будет привлекать зрителей</Text>
                    <div className={styles.previewFile}>
                        <input type="file" accept="png" className={styles.file}/>
                        <div className={styles.addFile}>
                            <Svg name='block'/>
                            <Text>Загрузить файл</Text>
                        </div>
                    </div>
                </div>

                <div className={styles.playlists}>
                    <Text>Плейлисты</Text>
                    <Text>Добавьте видео хотя бы в один плейлист, чтобы людям было удобнее ориентироваться на вашем канале</Text>
                    <Selector 
                        options={options}
                        placeholder="Выберите плейлист"
                        onChange={handleChange}
                        defaultValue={options[0]}
                    />
                </div>
            </form>

            <div>
                <div>

                </div>

                <div>
                    <div>
                        <Text>Ссылка на видео</Text>
                        <Text>sklgjhaspojgosjdoi</Text>
                        <Svg name="block" />
                    </div>

                    <div>
                        <Text>Название файла</Text>
                        <Text>{storedFile?.name}</Text>

                    </div>

                </div>


                <div></div>
                <div></div>
            </div>
        </div>
    )
}