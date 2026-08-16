import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { useCreateVideoModal } from "@/shared/store/createVideoModal";
import { Text } from "@/shared/ui";
import { TSteps } from ".."
import styles from "./styles.module.scss";
import clsx from "clsx";

interface IFragment {
    index: number;
    start: number;
    end: number;
    title: string;
}

interface IFormValues {
    fragments: IFragment[];
}

export const StepFragments = ({ setActiveStep, setLastCompletedStep, lastCompletedStep }: { 
    setActiveStep: (newStep: TSteps) => void,
    setLastCompletedStep: (newStep: TSteps) => void,
    lastCompletedStep: number
}) => {

    const { storedFile, addVideoData, videoData } = useCreateVideoModal()
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [isLoadingDuration, setIsLoadingDuration] = useState(false);
    
    // Функция для точного сравнения чисел с плавающей точкой
    const isEqual = (a: number, b: number, epsilon: number = 0.001): boolean => {
        return Math.abs(a - b) < epsilon;
    };
    
    useEffect(() => {
        if (!storedFile) {
            setVideoDuration(null);
            return;
        }

        const getDuration = async () => {
            setIsLoadingDuration(true);
            const video = document.createElement('video');
            const url = URL.createObjectURL(storedFile);
            
            try {
                await new Promise((resolve, reject) => {
                    video.addEventListener('loadedmetadata', () => {
                        resolve(video.duration);
                    });
                    video.addEventListener('error', reject);
                    video.src = url;
                });
                
                setVideoDuration(video.duration);
            } catch (error) {
                console.error('Ошибка получения длительности:', error);
                setVideoDuration(null);
            } finally {
                URL.revokeObjectURL(url);
                setIsLoadingDuration(false);
            }
        };

        getDuration();
    }, [storedFile]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        watch,
        trigger,
        reset
    } = useForm<IFormValues>({
        defaultValues: {
            fragments: videoData.fragments && videoData.fragments.length > 0 
                ? videoData.fragments 
                : []
        },
        mode: "onChange"
    });
    
    // Обновляем форму при изменении videoData.fragments в сторе
    useEffect(() => {
        if (videoData.fragments && videoData.fragments.length > 0) {
            reset({ fragments: videoData.fragments });
        }
    }, [videoData.fragments, reset]);
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "fragments"
    });

    // Следим за изменениями фрагментов
    const fragments = watch("fragments");
    
    // Получаем end последнего фрагмента как число
    const getLastFragmentEnd = (): number => {
        if (!fragments || fragments.length === 0) return 0;
        const lastEnd = fragments[fragments.length - 1]?.end;
        return typeof lastEnd === 'number' ? lastEnd : Number(lastEnd) || 0;
    };
    
    // Проверка, можно ли перейти на следующий шаг
    const isNextDisabled = () => {
        if (!videoDuration) return true;
        if (!fragments || fragments.length === 0) return false;
        
        const lastEnd = getLastFragmentEnd();
        // Используем isEqual с погрешностью 0.1 секунды
        return !isEqual(lastEnd, videoDuration, 0.1);
    };

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        const formData = new FormData();

        // Сохраняем фрагменты с индексами
        const fragmentsData = data.fragments.map((f, idx) => ({
            index: idx,  // Используем текущий индекс в массиве
            start: Number(f.start) || 0,
            end: Number(f.end) || 0,
            title: f.title || "",
        }));
        
        formData.append("fragments", JSON.stringify(fragmentsData));
        
        // Сохраняем в глобальный стор
        addVideoData({
            ...videoData,
            fragments: fragmentsData
        })

        if (lastCompletedStep === 0) {
            setLastCompletedStep(1)
        }

        setActiveStep(2);
    };
    
    const handleAddFragment = () => {
        const currentFragments = getValues("fragments");
        const lastEnd = Number(currentFragments[currentFragments.length - 1]?.end) || 0;
        const newIndex = currentFragments.length; // Индекс будет равен текущей длине массива
        append({ 
            index: newIndex, 
            start: lastEnd, 
            end: lastEnd, 
            title: "" 
        });
    };
    
    // Установить конец последнего фрагмента равным длительности видео
    const setLastFragmentEndToDuration = () => {
        if (videoDuration && fields.length > 0) {
            const lastIndex = fields.length - 1;
            setValue(`fragments.${lastIndex}.end`, videoDuration);
            trigger(`fragments.${lastIndex}.end`); // Триггерим валидацию
        }
    };
    
    // Валидация start: должен быть >= end предыдущего фрагмента
    const validateStart = (value: number, index: number) => {
        const fragments = getValues("fragments");
        const numValue = Number(value);
        
        if (isNaN(numValue)) return "Введите число";
        
        // Проверка с предыдущим фрагментом
        if (index > 0) {
            const prevEnd = Number(fragments[index - 1]?.end);
            if (!isNaN(prevEnd) && numValue < prevEnd - 0.01) { // Добавляем погрешность
                return `Start не может быть меньше ${prevEnd.toFixed(1)} (конец предыдущего фрагмента)`;
            }
        }
        
        // Проверка с собственным end
        const currentEnd = Number(fragments[index]?.end);
        if (!isNaN(currentEnd) && numValue >= currentEnd - 0.01) { // Добавляем погрешность
            return "Start должен быть меньше End";
        }
        
        return true;
    };
    
    // Валидация end: должен быть > start, не может превышать start следующего фрагмента
    const validateEnd = (value: number, index: number) => {
        const fragments = getValues("fragments");
        const numValue = Number(value);
        const currentStart = Number(fragments[index]?.start);
        
        if (isNaN(numValue)) return "Введите число";
        
        // Проверка с собственным start
        if (!isNaN(currentStart) && numValue <= currentStart + 0.01) { // Добавляем погрешность
            return "End должен быть больше Start";
        }
        
        // Проверка со следующим фрагментом
        if (index < fragments.length - 1) {
            const nextStart = Number(fragments[index + 1]?.start);
            if (!isNaN(nextStart) && numValue > nextStart + 0.01) { // Добавляем погрешность
                return `End не может быть больше ${nextStart.toFixed(1)} (начало следующего фрагмента)`;
            }
        }
        
        return true;
    };

    const formatDuration = (seconds: number): string => {
        if (isNaN(seconds)) return "0:00";
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const lastFragmentEnd = getLastFragmentEnd();
    const progressPercent = videoDuration ? (lastFragmentEnd / videoDuration) * 100 : 0;
    const isLastFragmentValid = videoDuration ? isEqual(lastFragmentEnd, videoDuration, 0.1) : false;

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={clsx(styles.section, {[styles.hideBlock]: videoData.isShort})}>
                    <h2 className={styles.subtitle}>Фрагменты</h2>
                    <p className={styles.description}>
                        Добавьте временные метки для навигации по видео
                    </p>
                    
                    {isLoadingDuration && (
                        <div className={styles.loading}>
                            Загрузка длительности видео...
                        </div>
                    )}
                    
                    {videoDuration && (
                        <div className={styles.durationInfo}>
                            Длительность видео: <strong>{formatDuration(videoDuration)}</strong> ({videoDuration.toFixed(2)} сек)
                        </div>
                    )}

                    {fields.length === 0 && (
                        <div className={styles.emptyState}>
                            Нет добавленных фрагментов
                        </div>
                    )}

                    {fields.map((field, index) => (
                        <div key={field.id} className={styles.fragmentRow}>
                            <div className={styles.fragmentHeader}>
                                <span className={styles.fragmentNumber}>Фрагмент {index + 1}</span>
                                {index === fields.length - 1 && videoDuration && (
                                    <button
                                        type="button"
                                        onClick={setLastFragmentEndToDuration}
                                        className={styles.setDurationBtn}
                                    >
                                        <Text>Установить конец {formatDuration(videoDuration)}</Text>
                                    </button>
                                )}
                            </div>
                            
                            <div className={styles.fragmentFields}>
                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        Start (сек)
                                        <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        {...register(`fragments.${index}.start` as const, {
                                            required: "Укажите время начала",
                                            min: { value: 0, message: "Время не может быть отрицательным" },
                                            validate: (value) => validateStart(Number(value), index),
                                            valueAsNumber: true
                                        })}
                                        className={`${styles.input} ${errors.fragments?.[index]?.start ? styles.inputError : ""}`}
                                        placeholder="0"
                                    />
                                    {errors.fragments?.[index]?.start && (
                                        <span className={styles.error}>
                                            {errors.fragments[index]?.start?.message}
                                        </span>
                                    )}
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>
                                        End (сек)
                                        <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        {...register(`fragments.${index}.end` as const, {
                                            required: "Укажите время окончания",
                                            min: { value: 0, message: "Время не может быть отрицательным" },
                                            validate: (value) => {
                                                const validationResult = validateEnd(Number(value), index);
                                                return validationResult;
                                            },
                                            valueAsNumber: true
                                        })}
                                        className={`${styles.input} ${errors.fragments?.[index]?.end ? styles.inputError : ""}`}
                                        placeholder="0"
                                    />
                                    {errors.fragments?.[index]?.end && (
                                        <span className={styles.error}>
                                            {errors.fragments[index]?.end?.message}
                                        </span>
                                    )}
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Заголовок</label>
                                    <input
                                        type="text"
                                        {...register(`fragments.${index}.title` as const, {
                                            maxLength: { value: 100, message: "Максимум 100 символов" }
                                        })}
                                        className={`${styles.input} ${errors.fragments?.[index]?.title ? styles.inputError : ""}`}
                                        placeholder="Название фрагмента"
                                    />
                                    {errors.fragments?.[index]?.title && (
                                        <span className={styles.error}>
                                            {errors.fragments[index]?.title?.message}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className={styles.removeBtn}
                                    aria-label="Удалить фрагмент"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddFragment}
                        className={styles.addBtn}
                    >
                        + Добавить фрагмент
                    </button>
                    
                    {videoDuration && fields.length > 0 && (
                        <div className={styles.progressInfo}>
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill}
                                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                                />
                            </div>
                            <div className={styles.progressText}>
                                <span>
                                    {lastFragmentEnd.toFixed(2)} сек / {videoDuration.toFixed(2)} сек
                                </span>
                                {fields.length > 0 && !isLastFragmentValid && (
                                    <span className={styles.warning}>
                                        ⚠️ Последний фрагмент должен заканчиваться в конце видео ({formatDuration(videoDuration)})
                                    </span>
                                )}
                                {isLastFragmentValid && (
                                    <span className={styles.success}>
                                        ✓ Последний фрагмент заканчивается в конце видео
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {videoData.isShort && (
                        <Text>Для коротких видео недостопны фрагменты</Text>
                    )}
                </div>

                <div className={styles.actions}>
                    <button
                        type="button"
                        onClick={() => setActiveStep(1)}
                        className={styles.backBtn}
                    >
                        Назад
                    </button>
                    <button 
                        type="submit" 
                        className={`${styles.submitBtn} ${videoData.isShort ? false : isNextDisabled() ? styles.disabled : ""}`}
                        disabled={videoData.isShort ? false : isNextDisabled()}
                    >
                        Продолжить
                    </button>
                </div>
            </form>
        </div>
    );
};