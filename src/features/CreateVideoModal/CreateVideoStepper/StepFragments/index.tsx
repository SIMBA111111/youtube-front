import { TSteps } from ".."
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import styles from "./styles.module.scss";
import { useCreateVideoModal } from "@/shared/store/createVideoModal";
import { useEffect, useState } from "react";

interface IFragment {
    start: number;
    end: number;
    title: string;
}

interface IFormValues {
    fragments: IFragment[];
}

export const StepFragments = ({ setActiveStep, setFormData }: { 
    setActiveStep: (newStep: TSteps) => void;
    setFormData?: (data: any) => void;
}) => {

    const { storedFile } = useCreateVideoModal()
    const [videoDuration, setVideoDuration] = useState<number | null>(null);
    const [isLoadingDuration, setIsLoadingDuration] = useState(false);
    
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
        watch
    } = useForm<IFormValues>({
        defaultValues: {
            fragments: [{ start: 0, end: 0, title: "" }]
        }
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "fragments"
    });

    // Следим за изменениями фрагментов
    const fragments = watch("fragments");
    
    // Получаем нормализованные значения (как числа)
    const getNormalizedFragments = () => {
        if (!fragments) return [];
        return fragments.map(f => ({
            ...f,
            start: Number(f.start) || 0,
            end: Number(f.end) || 0
        }));
    };
    
    // Получаем end последнего фрагмента как число
    const getLastFragmentEnd = (): number => {
        const normalized = getNormalizedFragments();
        if (normalized.length === 0) return 0;
        return normalized[normalized.length - 1].end;
    };
    
    // Проверка, можно ли перейти на следующий шаг
    const isNextDisabled = () => {
        if (!videoDuration) return true;
        if (!fragments || fragments.length === 0) return true;
        
        const lastEnd = getLastFragmentEnd();
        // Последний фрагмент должен заканчиваться точно на длительности видео
        return Math.abs(lastEnd - videoDuration) > 0.01;
    };

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        const formData = new FormData();

        const fragmentsData = data.fragments.map((f) => ({
            start: Number(f.start) || 0,
            end: Number(f.end) || 0,
            title: f.title || "",
        }));
        
        formData.append("fragments", JSON.stringify(fragmentsData));
        
        if (setFormData) {
            setFormData(formData);
        }
        
        console.log("Fragments:", fragmentsData);
        
        // Переход на следующий шаг
        // setActiveStep("next_step");
    };
    
    const handleAddFragment = () => {
        const currentFragments = getValues("fragments");
        const lastEnd = Number(currentFragments[currentFragments.length - 1]?.end) || 0;
        // Новый фрагмент начинается с последнего end или 0
        append({ start: lastEnd, end: lastEnd, title: "" });
    };
    
    // Установить конец последнего фрагмента равным длительности видео
    const setLastFragmentEndToDuration = () => {
        if (videoDuration && fields.length > 0) {
            const lastIndex = fields.length - 1;
            setValue(`fragments.${lastIndex}.end`, videoDuration);
        }
    };
    
    // Валидация start: должен быть >= end предыдущего фрагмента
    const validateStart = (value: number, index: number) => {
        const fragments = getValues("fragments");
        const numValue = Number(value);
        
        // Проверка с предыдущим фрагментом
        if (index > 0) {
            const prevEnd = Number(fragments[index - 1]?.end);
            if (!isNaN(prevEnd) && numValue < prevEnd) {
                return `Start не может быть меньше ${prevEnd.toFixed(1)} (конец предыдущего фрагмента)`;
            }
        }
        
        // Проверка с собственным end
        const currentEnd = Number(fragments[index]?.end);
        if (!isNaN(currentEnd) && numValue >= currentEnd) {
            return "Start должен быть меньше End";
        }
        
        return true;
    };
    
    // Валидация end: должен быть > start, не может превышать start следующего фрагмента и не может превышать длительность видео
    const validateEnd = (value: number, index: number) => {
        const fragments = getValues("fragments");
        const numValue = Number(value);
        const currentStart = Number(fragments[index]?.start);
        
        // Проверка с собственным start
        if (!isNaN(currentStart) && numValue <= currentStart) {
            return "End должен быть больше Start";
        }
        
        // Проверка с длительностью видео
        if (videoDuration && numValue > videoDuration) {
            return `End не может быть больше длительности видео (${formatDuration(videoDuration)})`;
        }
        
        // Проверка со следующим фрагментом
        if (index < fragments.length - 1) {
            const nextStart = Number(fragments[index + 1]?.start);
            if (!isNaN(nextStart) && numValue > nextStart) {
                return `End не может быть больше ${nextStart.toFixed(1)} (начало следующего фрагмента)`;
            }
        }
        
        // Для последнего фрагмента: end должен быть равен длительности видео
        if (index === fragments.length - 1 && videoDuration) {
            if (Math.abs(numValue - videoDuration) > 0.01) {
                return `Последний фрагмент должен заканчиваться в конце видео (${formatDuration(videoDuration)})`;
            }
        }
        
        return true;
    };

    const formatDuration = (seconds: number): string => {
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

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.section}>
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
                            Длительность видео: <strong>{formatDuration(videoDuration)}</strong>
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
                                        Установить конец {formatDuration(videoDuration)}
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
                                        step="0.1"
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
                                        step="0.1"
                                        {...register(`fragments.${index}.end` as const, {
                                            required: "Укажите время окончания",
                                            min: { value: 0, message: "Время не может быть отрицательным" },
                                            validate: (value) => validateEnd(Number(value), index),
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
                                    {lastFragmentEnd.toFixed(1)} сек / {videoDuration.toFixed(1)} сек
                                </span>
                                {Math.abs(lastFragmentEnd - videoDuration) > 0.01 && (
                                    <span className={styles.warning}>
                                        ⚠️ Последний фрагмент должен заканчиваться в конце видео
                                    </span>
                                )}
                            </div>
                        </div>
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
                        className={`${styles.submitBtn} ${isNextDisabled() ? styles.disabled : ""}`}
                        disabled={isNextDisabled()}
                    >
                        Продолжить
                    </button>
                </div>
            </form>
        </div>
    );
};